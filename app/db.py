"""
Supabase Database Client & Helper Module (app/db.py)
===================================================
Manages storing and retrieving poster data, generated campaigns, and post tracking stats.

--- SUPABASE SQL EDITOR TABLE SETUP ---
Run this SQL query in your Supabase SQL Editor (Dashboard -> SQL Editor):

CREATE TABLE IF NOT EXISTS posters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cropped_square_path TEXT,
    cropped_story_path TEXT,
    extracted_text TEXT,
    event_title TEXT,
    event_date TEXT,
    event_venue TEXT,
    vibe TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poster_id UUID REFERENCES posters(id) ON DELETE SET NULL,
    instagram_caption TEXT,
    instagram_carousel_slides JSONB,
    instagram_hashtags JSONB,
    linkedin_post TEXT,
    media_paths JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id TEXT UNIQUE NOT NULL,
    platform TEXT NOT NULL,
    status TEXT NOT NULL,
    published_at TEXT,
    likes_count INT DEFAULT 0,
    needs_refresh BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
"""

import os
import logging
from typing import Optional, Dict, Any
from dotenv import load_dotenv
from supabase import create_client, Client

from app.schemas import IngestedPosterData, GeneratedCampaign, PostStatus

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# Initialize Supabase client if valid credentials exist
supabase: Optional[Client] = None

if SUPABASE_URL and SUPABASE_KEY and "YOUR_SUPABASE" not in SUPABASE_URL:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logging.info("Supabase client initialized successfully.")
    except Exception as e:
        logging.warning(f"Failed to initialize Supabase client: {e}")
else:
        logging.warning("Supabase credentials not configured in .env. Operating in fallback mode.")


def get_db_client() -> Optional[Client]:
    """Returns the active Supabase client or None if unconfigured."""
    return supabase


def save_ingested_poster(poster_data: IngestedPosterData) -> Dict[str, Any]:
    """
    Step 1: Stores ingested poster data from Person 1 & Person 2 into 'posters' table.
    """
    data = poster_data.model_dump()
    if supabase:
        try:
            res = supabase.table("posters").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving poster to Supabase: {e}")
    
    # Mock fallback response if DB is not configured yet
    return {"id": "mock-poster-uuid-1234", **data}


def save_generated_campaign(campaign: GeneratedCampaign, poster_id: Optional[str] = None) -> Dict[str, Any]:
    """
    Step 2: Stores generated prompts, captions & carousel slides from Person 2 into 'campaigns' table.
    """
    data = {
        "poster_id": poster_id,
        "instagram_caption": campaign.instagram_caption,
        "instagram_carousel_slides": campaign.instagram_carousel_slides,
        "instagram_hashtags": campaign.instagram_hashtags,
        "linkedin_post": campaign.linkedin_post,
        "media_paths": campaign.media_paths
    }
    if supabase:
        try:
            res = supabase.table("campaigns").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving campaign to Supabase: {e}")

    # Mock fallback response
    return {"id": "mock-campaign-uuid-5678", **data}


def save_post_status(status: PostStatus) -> Dict[str, Any]:
    """
    Step 3: Stores or updates social publication status & 2-hour traction analytics from Person 3 into 'post_statuses' table.
    """
    data = status.model_dump()
    if supabase:
        try:
            res = supabase.table("post_statuses").upsert(data, on_conflict="post_id").execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving post status to Supabase: {e}")

    # Mock fallback response
    return {"id": "mock-status-uuid-9999", **data}
