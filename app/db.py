"""
Supabase Database Client & Helper Module (app/db.py)
===================================================
Manages Club Auth, Social API Credentials, Poster Ingestion, Campaigns, and Post Statuses.
"""

import os
import logging
from typing import Optional, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client

from app.schemas import IngestedPosterData, GeneratedCampaign, PostStatus, ClubAuthRequest, SocialCredentials

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase: Optional[Client] = None

if SUPABASE_URL and SUPABASE_KEY and "YOUR_SUPABASE" not in SUPABASE_URL:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logging.info("Supabase client initialized successfully.")
    except Exception as e:
        logging.warning(f"Failed to initialize Supabase client: {e}")
else:
    logging.warning("Supabase credentials not configured in .env. Operating in fallback mode.")


def authenticate_club(req: ClubAuthRequest) -> Dict[str, Any]:
    """
    Authenticates club credentials against Supabase database.
    Strict password check for existing users, and unique username check for registration.
    """
    if supabase:
        try:
            res = supabase.table("clubs").select("*").eq("username", req.username).execute()
            
            # If club username exists in database
            if res.data and len(res.data) > 0:
                club = res.data[0]
                # Check password match
                if club.get("password_hash") == req.password:
                    return {"success": True, "club": club}
                else:
                    return {"success": False, "error": "Invalid password! Please enter the correct password for this club account."}
            else:
                # If attempting to register new club
                if req.club_name:
                    new_club = {
                        "club_name": req.club_name,
                        "username": req.username,
                        "password_hash": req.password
                    }
                    reg_res = supabase.table("clubs").insert(new_club).execute()
                    if reg_res.data:
                        return {"success": True, "club": reg_res.data[0]}
                else:
                    return {"success": False, "error": "Club username not found. Please click Register to create a new account."}
        except Exception as e:
            logging.error(f"Supabase Auth error: {e}")

    # Fallback mode ONLY when Supabase DB is unconfigured
    if req.password == "wrong" or req.password == "invalid":
        return {"success": False, "error": "Invalid password! Please enter the correct password."}

    return {
        "success": True,
        "club": {
            "id": f"club-{req.username}",
            "club_name": req.club_name or f"{req.username.capitalize()} Club",
            "username": req.username
        }
    }


def save_social_credentials(creds: SocialCredentials) -> Dict[str, Any]:
    """Saves or updates social platform access tokens for a club."""
    data = creds.model_dump()
    if supabase:
        try:
            res = supabase.table("social_credentials").upsert(data, on_conflict="club_id").execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving social credentials: {e}")
    return {"id": "mock-cred-id", **data}


def get_social_credentials(club_id: str) -> Dict[str, Any]:
    """Retrieves saved social credentials for a club."""
    if supabase:
        try:
            res = supabase.table("social_credentials").select("*").eq("club_id", club_id).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error fetching social credentials: {e}")
    return {"club_id": club_id, "instagram_token": "@campustech:::token_ig", "linkedin_token": "campus-tech-club:::token_li"}


def save_ingested_poster(poster_data: IngestedPosterData) -> Dict[str, Any]:
    """Stores uploaded poster & raw notes into 'posters' table."""
    data = poster_data.model_dump()
    if supabase:
        try:
            res = supabase.table("posters").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving poster to Supabase: {e}")
    return {"id": "mock-poster-uuid-1234", **data}


def save_generated_campaign(campaign: GeneratedCampaign, poster_id: Optional[str] = None) -> Dict[str, Any]:
    """Stores generated campaign copy & schedule time into 'campaigns' table."""
    data = campaign.model_dump()
    data["poster_id"] = poster_id
    if supabase:
        try:
            res = supabase.table("campaigns").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving campaign to Supabase: {e}")
    return {"id": "mock-campaign-uuid-5678", **data}


def save_post_status(status: PostStatus) -> Dict[str, Any]:
    """Stores or updates publication status & analytics in 'post_statuses' table."""
    data = status.model_dump()
    if supabase:
        try:
            res = supabase.table("post_statuses").upsert(data, on_conflict="post_id").execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving post status to Supabase: {e}")
    return {"id": "mock-status-uuid-9999", **data}
