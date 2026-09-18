"""
Shared Data Model Contract (app/schemas.py)
===========================================
LOCKED AT HOUR 1 FOR ALL TEAM MEMBERS.
Extended with Club Auth, Social Credentials & Post Scheduling.
"""

from pydantic import BaseModel, Field
from typing import List, Optional

class ClubAuthRequest(BaseModel):
    username: str = Field(..., description="Club account username")
    password: str = Field(..., description="Club account password")
    club_name: Optional[str] = Field(default="", description="Club name for registration")

class SocialCredentials(BaseModel):
    club_id: str = Field(..., description="Associated club UUID or ID")
    instagram_token: Optional[str] = Field(default="", description="Instagram API access token / handle")
    linkedin_token: Optional[str] = Field(default="", description="LinkedIn OAuth token / account ID")

class IngestedPosterData(BaseModel):
    cropped_square_path: str = Field(..., description="Path to 1:1 square crop")
    cropped_story_path: str = Field(..., description="Path to 9:16 vertical story crop")
    extracted_text: str = Field(..., description="Raw extracted text from visual poster")
    raw_notes: Optional[str] = Field(default="", description="President's typed raw notes (e.g. prizes, schedule)")
    event_title: str = Field(..., description="Parsed event title")
    event_date: str = Field(..., description="Parsed event date & time")
    event_venue: str = Field(..., description="Parsed event location / venue")
    vibe: str = Field(..., description="Extracted tone & vibe (e.g. Energetic, Tech, Formal)")

class GeneratedCampaign(BaseModel):
    instagram_caption: str = Field(..., description="Tailored Instagram post caption")
    instagram_carousel_slides: List[str] = Field(default_factory=list, description="Content outline for carousel slides")
    instagram_hashtags: List[str] = Field(default_factory=list, description="Targeted Instagram hashtags")
    linkedin_post: str = Field(..., description="Professional LinkedIn publication copy")
    media_paths: List[str] = Field(default_factory=list, description="File paths to prepared image media assets")
    scheduled_at: Optional[str] = Field(default="", description="ISO datetime string for scheduled post, empty for immediate")

class PostStatus(BaseModel):
    post_id: str = Field(..., description="Unique publication tracking ID")
    platform: str = Field(..., description="Target social media platform (instagram, linkedin)")
    status: str = Field(..., description="Publish status: pending, scheduled, published, failed")
    published_at: str = Field(..., description="ISO 8601 timestamp of publication or schedule target")
    likes_count: int = Field(default=0, description="Current accumulated likes/reactions")
    needs_refresh: bool = Field(default=False, description="True if traction check triggers auto-refresh after 2 hours")
