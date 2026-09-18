"""
Shared Data Model Contract (app/schemas.py)
===========================================
LOCKED AT HOUR 1 FOR ALL TEAM MEMBERS.
Do not modify field names without team alignment.
"""

from pydantic import BaseModel, Field
from typing import List, Optional

class IngestedPosterData(BaseModel):
    cropped_square_path: str = Field(..., description="Path to 1:1 square crop")
    cropped_story_path: str = Field(..., description="Path to 9:16 vertical story crop")
    extracted_text: str = Field(..., description="Raw extracted text from visual poster")
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

class PostStatus(BaseModel):
    post_id: str = Field(..., description="Unique publication tracking ID")
    platform: str = Field(..., description="Target social media platform (instagram, linkedin)")
    status: str = Field(..., description="Publish status: pending, published, failed")
    published_at: str = Field(..., description="ISO 8601 published timestamp")
    likes_count: int = Field(default=0, description="Current accumulated likes/reactions")
    needs_refresh: bool = Field(default=False, description="True if traction check triggers auto-refresh after 2 hours")
