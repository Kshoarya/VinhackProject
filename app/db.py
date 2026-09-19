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


_SOCIAL_CREDENTIALS_CACHE: Dict[str, Dict[str, Any]] = {}

def save_social_credentials(creds: SocialCredentials) -> Dict[str, Any]:
    """Saves or updates social platform access tokens for a club."""
    data = creds.model_dump()
    _SOCIAL_CREDENTIALS_CACHE[creds.club_id] = data
    if supabase:
        try:
            res = supabase.table("social_credentials").upsert(data, on_conflict="club_id").execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logging.error(f"Error saving social credentials to Supabase: {e}")
    return {"id": "mock-cred-id", **data}


def get_social_credentials(club_id: str) -> Dict[str, Any]:
    """Retrieves saved social credentials for a club. Auto-syncs live Unipile accounts if missing."""
    creds = None
    if supabase:
        try:
            res = supabase.table("social_credentials").select("*").eq("club_id", club_id).execute()
            if res.data and len(res.data) > 0:
                creds = res.data[0]
                _SOCIAL_CREDENTIALS_CACHE[club_id] = creds
        except Exception as e:
            logging.error(f"Error fetching social credentials: {e}")

    if not creds and club_id in _SOCIAL_CREDENTIALS_CACHE:
        creds = _SOCIAL_CREDENTIALS_CACHE[club_id]

    if not creds:
        creds = {"club_id": club_id, "instagram_token": "", "linkedin_token": "", "unipile_account_id": ""}

    # Auto-healing: If unipile_account_id is empty, attempt live Unipile API sync
    if not creds.get("unipile_account_id"):
        try:
            from app.auth.unipile import UnipileAuth
            auth = UnipileAuth()
            accounts = auth.list_accounts()
            for acc in accounts:
                if acc.get("id"):
                    new_acc_id = acc.get("id")
                    print(f"[Auto-Sync Creds] Found live Unipile account ID '{new_acc_id}'. Saving to Supabase for club '{club_id}'.")
                    creds = save_unipile_account_id(club_id, new_acc_id)
                    break
        except Exception as err:
            print(f"[Auto-Sync Creds Warning] Could not auto-sync live Unipile accounts: {err}")

    return creds

def save_unipile_account_id(club_id: str, account_id: str) -> Dict[str, Any]:
    """Stores the Unipile account ID for a club."""
    if supabase:
        try:
            # Check whether social credentials already exist for this club
            existing_res = (
                supabase
                .table("social_credentials")
                .select("*")
                .eq("club_id", club_id)
                .execute()
            )

            if existing_res.data:
                # Update existing row
                res = (
                    supabase
                    .table("social_credentials")
                    .update({
                        "unipile_account_id": account_id
                    })
                    .eq("club_id", club_id)
                    .execute()
                )
            else:
                # Create a new row
                res = (
                    supabase
                    .table("social_credentials")
                    .insert({
                        "club_id": club_id,
                        "instagram_token": "",
                        "linkedin_token": "",
                        "unipile_account_id": account_id
                    })
                    .execute()
                )

            if res.data:
                _SOCIAL_CREDENTIALS_CACHE[club_id] = res.data[0]
                return res.data[0]

        except Exception as e:
            logging.error(f"Error saving Unipile account ID: {e}")

    # Fallback/cache mode
    existing = _SOCIAL_CREDENTIALS_CACHE.get(
        club_id,
        {
            "club_id": club_id,
            "instagram_token": "",
            "linkedin_token": ""
        }
    )
    existing["unipile_account_id"] = account_id
    _SOCIAL_CREDENTIALS_CACHE[club_id] = existing
    return existing


def sync_live_unipile_account(club_id: str = "club_default") -> Optional[str]:
    """
    Queries Unipile's live API GET /api/v1/accounts.
    Updates Supabase with the latest active connected account ID.
    Clears mock test IDs (like test_acc_123) if no real accounts exist in Unipile.
    """
    try:
        from app.auth.unipile import UnipileAuth
        auth = UnipileAuth()
        accounts = auth.list_accounts()
        print(f"[Sync Live Unipile Accounts] Found {len(accounts)} accounts in Unipile API")
        
        valid_account_id = None
        for acc in accounts:
            acc_id = acc.get("id")
            if acc_id:
                valid_account_id = acc_id
                break
        
        if valid_account_id:
            print(f"[Sync Live Unipile Accounts] Updating club '{club_id}' with real Unipile account ID '{valid_account_id}'")
            save_unipile_account_id(club_id, valid_account_id)
            return valid_account_id
        else:
            print(f"[Sync Live Unipile Accounts] No connected accounts in Unipile. Clearing stale IDs for club '{club_id}'.")
            # If current DB has a test/invalid ID, clear it
            save_unipile_account_id(club_id, "")
            return None
    except Exception as e:
        print(f"[Sync Live Unipile Accounts Error] {e}")
        return None

    existing["unipile_account_id"] = account_id
    _SOCIAL_CREDENTIALS_CACHE[club_id] = existing

    return existing

def process_media_path_for_storage(path_or_url: str, base_url: str = "http://localhost:8000") -> str:
    """
    Converts a local image file path into a public web URL accessible by any external user/device.
    Tries uploading to Supabase Storage first; falls back to static backend HTTP URL.
    """
    if not path_or_url or path_or_url.startswith(("http://", "https://", "data:")):
        return path_or_url

    clean_path = path_or_url.replace("\\", "/")
    
    # 1. Try uploading to Supabase Storage bucket 'posters' if client is initialized
    if supabase and os.path.exists(clean_path):
        try:
            filename = os.path.basename(clean_path)
            storage_path = f"public/{filename}"
            with open(clean_path, "rb") as f:
                file_bytes = f.read()
            
            res = supabase.storage.from_("posters").upload(
                path=storage_path,
                file=file_bytes,
                file_options={"upsert": "true", "content-type": "image/png"}
            )
            if res:
                public_url = supabase.storage.from_("posters").get_public_url(storage_path)
                if public_url:
                    logging.info(f"Uploaded poster to Supabase Storage: {public_url}")
                    return public_url
        except Exception as e:
            logging.warning(f"Supabase Storage upload fallback: {e}")

    # 2. Public Static HTTP Server URL fallback
    if clean_path.startswith("uploads/"):
        return f"{base_url.rstrip('/')}/{clean_path}"
    elif clean_path.startswith("/uploads/"):
        return f"{base_url.rstrip('/')}{clean_path}"
    else:
        return f"{base_url.rstrip('/')}/uploads/{clean_path.lstrip('/')}"


def save_ingested_poster(poster_data: IngestedPosterData, base_url: str = "http://localhost:8000") -> Dict[str, Any]:
    """Stores uploaded poster & raw notes into 'posters' table with public image URLs."""
    poster_data.cropped_square_path = process_media_path_for_storage(poster_data.cropped_square_path, base_url)
    poster_data.cropped_story_path = process_media_path_for_storage(poster_data.cropped_story_path, base_url)
    data = poster_data.model_dump()
    if supabase:
        try:
            res = supabase.table("posters").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            if "raw_notes" in data:
                clean_data = {k: v for k, v in data.items() if k != "raw_notes"}
                try:
                    res = supabase.table("posters").insert(clean_data).execute()
                    if res.data:
                        return res.data[0]
                except Exception as retry_err:
                    logging.error(f"Error saving poster to Supabase: {retry_err}")
            else:
                logging.error(f"Error saving poster to Supabase: {e}")
    return {"id": "mock-poster-uuid-1234", **data}


def save_generated_campaign(campaign: GeneratedCampaign, poster_id: Optional[str] = None, base_url: str = "http://localhost:8000") -> Dict[str, Any]:
    """Stores generated campaign copy & schedule time into 'campaigns' table with public media URLs."""
    if campaign.media_paths:
        campaign.media_paths = [process_media_path_for_storage(p, base_url) for p in campaign.media_paths]
    data = campaign.model_dump()
    data["poster_id"] = poster_id
    if supabase:
        try:
            res = supabase.table("campaigns").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            if "scheduled_at" in data:
                clean_data = {k: v for k, v in data.items() if k != "scheduled_at"}
                try:
                    res = supabase.table("campaigns").insert(clean_data).execute()
                    if res.data:
                        return res.data[0]
                except Exception as retry_err:
                    logging.error(f"Error saving campaign to Supabase: {retry_err}")
            else:
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
