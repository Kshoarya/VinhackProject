"""
Orchestrator Module (PERSON 1 ONLY - UI & Pipeline Lead)
=========================================================
Folder Owner: PERSON 1
Responsibilities:
- FastAPI Web API Backend serving the React Web Dashboard
- End-to-End Pipeline Orchestration (Poster Upload -> Vision Extraction -> Reasoning -> Dispatch -> Tracking)
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

app = FastAPI(
    title="CampusSync Orchestration Hub",
    description="Main Backend Pipeline connecting React UI to AI Vision, Reasoning, Dispatch, and Traction Monitoring.",
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
    """
    try:
        os.makedirs("uploads", exist_ok=True)
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Call Person 2's Smart Cropper
        square_path, story_path = crop_poster_image(file_path)
        
        # Call Person 2's Vision LLM Extractor
        poster_data = extract_poster_data(file_path, square_path, story_path)
        return poster_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Poster ingestion error: {str(e)}")

@app.post("/api/generate", response_model=GeneratedCampaign)
async def generate_campaign_content(poster_data: IngestedPosterData, club_name: str = "Campus Tech Club"):
    """
    Step 2: AI Campaign Generation.
    Fetches Club Memory and generates Instagram & LinkedIn captions.
    """
    try:
        club_memory = get_club_memory(club_name)
        campaign = generate_campaign(poster_data, club_memory)
        return campaign
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Campaign generation error: {str(e)}")

@app.post("/api/publish", response_model=List[PostStatus])
async def publish_social(campaign: GeneratedCampaign):
    """
    Step 3: Dispatch to Social Media Platforms.
    Calls Person 3's Social Media Publisher API.
    """
    try:
        post_statuses = publish_campaign(campaign)
        return post_statuses
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Publish error: {str(e)}")

@app.get("/api/tracker/{post_id}", response_model=PostStatus)
async def track_post_engagement(post_id: str):
    """
    Step 4: 2-Hour Traction Tracker.
    Calls Person 3's Analytics Tracker & Auto-Refresh check.
    """
    try:
        status = check_post_traction(post_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tracking error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.orchestrator:app", host="0.0.0.0", port=8000, reload=True)
