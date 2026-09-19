"""
Orchestrator Module (PERSON 1 ONLY - UI & Pipeline Lead)
=========================================================
Folder Owner: PERSON 1
Responsibilities:
- FastAPI Web API Backend serving the React Web Dashboard
- End-to-End Pipeline Orchestration (Auth -> Multiple Poster Upload -> Vision Extraction -> Reasoning -> Dispatch -> Tracking)
- Database logging via Supabase (app/db.py)
"""

import os
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.schemas import IngestedPosterData, GeneratedCampaign, PostStatus, ClubAuthRequest, SocialCredentials
from app.ingestion.cropper import crop_poster_image
from app.ingestion.vision import extract_poster_data
from app.reasoning.mcp_server import get_club_memory
from app.reasoning.generator import generate_campaign
from app.dispatch.publisher import publish_campaign
from app.monitor.tracker import check_post_traction
from app.db import (
    authenticate_club,
    save_social_credentials,
    get_social_credentials,
    save_unipile_account_id,
    save_ingested_poster,
    save_generated_campaign,
    save_post_status
)

app = FastAPI(
    title="CampusSync Orchestration Hub",
    description="Main Backend Pipeline connecting React UI to Auth, AI Vision, Reasoning, Dispatch, Tracking, and Supabase DB.",
    version="1.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "CampusSync Orchestrator", "owner": "Person 1"}

@app.post("/api/auth/login")
async def login_club(req: ClubAuthRequest):
    """Authenticates club login or registers new account."""
    res = authenticate_club(req)
    if not res.get("success"):
        raise HTTPException(status_code=401, detail=res.get("error", "Authentication failed"))
    return res

@app.post("/api/social-credentials")
async def store_social_credentials(creds: SocialCredentials):
    """Saves Instagram and LinkedIn API handles & tokens for a club."""
    return save_social_credentials(creds)

@app.get("/api/social-credentials/{club_id}")
async def fetch_social_credentials(club_id: str):
    """Fetches saved social API credentials for a club."""
    return get_social_credentials(club_id)

@app.get("/api/unipile/connect-url")
async def get_unipile_connect_url(
    club_id: Optional[str] = "club_default",
    redirect_url: Optional[str] = "http://localhost:3000",
    providers: Optional[str] = "LINKEDIN,INSTAGRAM"
):
    """Generates a dynamic Unipile Hosted Auth Wizard URL with redirection & callback webhook."""
    try:
        from app.auth.unipile import UnipileAuth
        auth = UnipileAuth()

        provider_list = [p.strip().upper() for p in providers.split(",") if p.strip()] if providers else ["LINKEDIN", "INSTAGRAM"]
        
        success_redirect = f"{redirect_url.rstrip('/')}?auth_status=success&club_id={club_id}"
        failure_redirect = f"{redirect_url.rstrip('/')}?auth_status=failed&club_id={club_id}"
        public_server_url = os.getenv("PUBLIC_SERVER_URL") or os.getenv("NGROK_URL") or "http://localhost:8000"
        notify_webhook = f"{public_server_url.rstrip('/')}/api/unipile/callback"

        url = auth.create_hosted_auth_link(
            user_id=club_id,
            notify_url=notify_webhook,
            success_redirect_url=success_redirect,
            failure_redirect_url=failure_redirect,
            providers=provider_list,
            enable_unilogin=True,
            expires_in_minutes=60
        )
        return {"success": True, "url": url, "notify_url": notify_webhook}
    except Exception as e:
        print(f"[Unipile Auth Link Error] {e}")
        return {"success": False, "error": str(e), "url": None}


@app.post("/api/unipile/callback")
async def unipile_auth_callback(payload: dict):
    """Callback webhook invoked by Unipile after account authentication."""
    try:
        print(f"[Unipile Callback Payload] {payload}")
        status = payload.get("status")
        account_id = payload.get("account_id")
        club_id = payload.get("name") or "club_default"

        if status in ("CREATION_SUCCESS", "RECONNECTED") and account_id:
            save_unipile_account_id(
                club_id=club_id,
                account_id=account_id
            )

            print(
                    f"[Unipile Callback Success] "
                    f"Linked Account ID '{account_id}' to Club '{club_id}'"
            )

        return {"status": "ok", "received": payload}
    except Exception as e:
        print(f"[Unipile Callback Error] {e}")
        return {"status": "error", "message": str(e)}



@app.post("/api/ingest", response_model=IngestedPosterData)
async def ingest_poster(files: List[UploadFile] = File(...), raw_notes: Optional[str] = Form("")):
    """Step 1: Ingests multiple uploaded poster images and raw notes."""
    try:
        os.makedirs("uploads", exist_ok=True)
        primary_file = files[0] if files else None
        file_path = f"uploads/{primary_file.filename}" if primary_file else "uploads/poster.png"
        
        for f in files:
            p_path = f"uploads/{f.filename}"
            with open(p_path, "wb") as out:
                out.write(await f.read())
        
        square_path, story_path = crop_poster_image(file_path)
        poster_data = extract_poster_data(file_path, square_path, story_path)
        if raw_notes:
            poster_data.raw_notes = raw_notes
        
        save_ingested_poster(poster_data)
        return poster_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Poster ingestion error: {str(e)}")

@app.post("/api/generate", response_model=GeneratedCampaign)
async def generate_campaign_content(poster_data: IngestedPosterData, club_name: str = "Campus Tech Club"):
    """Step 2: AI Campaign Generation using Vision & Club Memory."""
    try:
        club_memory = get_club_memory(club_name)
        campaign = generate_campaign(poster_data, club_memory)
        save_generated_campaign(campaign)
        return campaign
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Campaign generation error: {str(e)}")

@app.post("/api/publish", response_model=List[PostStatus])
async def publish_social(campaign: GeneratedCampaign, club_id: Optional[str] = "club_default"):
    """Step 3: Dispatches social campaign immediately or registers scheduled time."""
    try:
        post_statuses = publish_campaign(campaign, club_id=club_id)
        if campaign.scheduled_at:
            for s in post_statuses:
                s.status = "scheduled"
                s.published_at = campaign.scheduled_at
        
        for status in post_statuses:
            save_post_status(status)
            
        save_generated_campaign(campaign)
        return post_statuses
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Publish error: {str(e)}")

@app.get("/api/tracker/{post_id}", response_model=PostStatus)
async def track_post_engagement(post_id: str):
    """Step 4: 2-Hour Traction Tracker."""
    try:
        status = check_post_traction(post_id)
        save_post_status(status)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tracking error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.orchestrator:app", host="0.0.0.0", port=8000, reload=True)
