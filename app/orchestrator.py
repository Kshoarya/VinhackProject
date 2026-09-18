"""
Orchestrator Module (PERSON 1 ONLY - UI & Pipeline Lead)
=========================================================
Folder Owner: PERSON 1
Responsibilities:
- FastAPI Web API Backend serving the React Web Dashboard
- End-to-End Pipeline Orchestration (Poster Upload -> Vision Extraction -> Reasoning -> Dispatch -> Tracking)
- Database logging via Supabase (app/db.py)
"""

import os
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import IngestedPosterData, GeneratedCampaign, PostStatus
from app.ingestion.cropper import crop_poster_image
from app.ingestion.vision import extract_poster_data
from app.reasoning.mcp_server import get_club_memory
from app.reasoning.generator import generate_campaign
from app.dispatch.publisher import publish_campaign
from app.monitor.tracker import check_post_traction
from app.db import save_ingested_poster, save_generated_campaign, save_post_status

app = FastAPI(
    title="CampusSync Orchestration Hub",
    description="Main Backend Pipeline connecting React UI to AI Vision, Reasoning, Dispatch, Tracking, and Supabase Database.",
    version="1.0.0"
)

# Enable CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    """Health check endpoint to verify backend status."""
    return {"status": "ok", "service": "CampusSync Orchestrator", "owner": "Person 1"}

@app.post("/api/ingest", response_model=IngestedPosterData)
async def ingest_poster(file: UploadFile = File(...)):
    """
    Step 1: User uploads event poster image.
    Calls Person 2's OpenCV Cropper and Vision LLM Parser.
    Saves ingested data to Supabase DB.
    """
    try:
        os.makedirs("uploads", exist_ok=True)
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # 1. Call Person 2's Smart Cropper
        square_path, story_path = crop_poster_image(file_path)
        
        # 2. Call Person 2's Vision LLM Extractor
        poster_data = extract_poster_data(file_path, square_path, story_path)
        
        # 3. Store input poster in Supabase DB
        save_ingested_poster(poster_data)
        
        return poster_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Poster ingestion error: {str(e)}")

@app.post("/api/generate", response_model=GeneratedCampaign)
async def generate_campaign_content(poster_data: IngestedPosterData, club_name: str = "Campus Tech Club"):
    """
    Step 2: AI Campaign Generation (Person 2).
    Fetches Club Memory and generates Instagram & LinkedIn captions.
    Saves generated prompts/campaign copy to Supabase DB.
    """
    try:
        club_memory = get_club_memory(club_name)
        campaign = generate_campaign(poster_data, club_memory)
        
        # Store generated prompts & campaign copy in Supabase DB
        save_generated_campaign(campaign)
        
        return campaign
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Campaign generation error: {str(e)}")

@app.post("/api/publish", response_model=List[PostStatus])
async def publish_social(campaign: GeneratedCampaign):
    """
    Step 3: Dispatch to Social Media Platforms (Person 3).
    Calls Social Media Publisher API and stores status in Supabase DB.
    """
    try:
        post_statuses = publish_campaign(campaign)
        
        # Store publication statuses in Supabase DB
        for status in post_statuses:
            save_post_status(status)
            
        return post_statuses
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Publish error: {str(e)}")

@app.get("/api/tracker/{post_id}", response_model=PostStatus)
async def track_post_engagement(post_id: str):
    """
    Step 4: 2-Hour Traction Tracker (Person 3).
    Checks post analytics, updates refresh flag, and syncs to Supabase DB.
    """
    try:
        status = check_post_traction(post_id)
        
        # Sync updated engagement metrics & refresh flag to Supabase DB
        save_post_status(status)
        
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tracking error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.orchestrator:app", host="0.0.0.0", port=8000, reload=True)
