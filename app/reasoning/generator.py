"""
Dual Caption Generator (PERSON 2 ONLY)
=====================================
Primary Focus: Instagram & LinkedIn Prompting and Copy Generation
Folder Ownership: app/reasoning/
"""

from typing import Dict, Any
from app.schemas import IngestedPosterData, GeneratedCampaign

def generate_campaign(poster_data: IngestedPosterData, club_memory: Dict[str, Any]) -> GeneratedCampaign:
    """
    Generates tailored Instagram and LinkedIn social media campaigns using LLM reasoning.
    
    Args:
        poster_data (IngestedPosterData): Output from vision parsing step.
        club_memory (Dict[str, Any]): Context guidelines from MCP server.
        
    Returns:
        GeneratedCampaign: Instagram caption, hashtags, carousel slide contents, and LinkedIn post.
    """
    # TODO (Person 2): Integrate Gemini 2.5 Flash / OpenAI LLM prompt chain incorporating club memory tone.
    
    hashtags = club_memory.get("default_hashtags", ["#CampusSync", "#Hackathon"])
    
    instagram_caption = (
        f"🔥 {poster_data.event_title} IS FINALLY HERE!\n\n"
        f"Get ready for an adrenaline-fueled building experience. "
        f"Join us at {poster_data.event_venue} on {poster_data.event_date}.\n\n"
        f"⚡ Vibe: {poster_data.vibe}\n"
        f"📌 Save this post & tag your team members below!\n\n"
        f"{' '.join(hashtags)}"
    )
    
    linkedin_post = (
        f"📢 Announcement: {poster_data.event_title}\n\n"
        f"We are excited to host {poster_data.event_title}, designed to foster innovation, "
        f"rapid prototyping, and engineering excellence across campus.\n\n"
        f"Event Details:\n"
        f"🗓️ Date & Time: {poster_data.event_date}\n"
        f"📍 Location: {poster_data.event_venue}\n"
        f"🎯 Format: Hands-on hackathon & building sprint\n\n"
        f"Whether you are a developer, designer, or problem solver, come build future-ready solutions with us. "
        f"Find registration details and schedule link below.\n\n"
        f"#CampusSync #Innovation #TechCommunity #Hackathon"
    )
    
    carousel_slides = [
        f"Slide 1: {poster_data.event_title} Overview",
        f"Slide 2: Schedule & Tracks ({poster_data.event_date})",
        f"Slide 3: Prizes & Mentors",
        f"Slide 4: Venue Map ({poster_data.event_venue})"
    ]
    
    media_paths = [poster_data.cropped_square_path, poster_data.cropped_story_path]
    
    return GeneratedCampaign(
        instagram_caption=instagram_caption,
        instagram_carousel_slides=carousel_slides,
        instagram_hashtags=hashtags,
        linkedin_post=linkedin_post,
        media_paths=media_paths
    )
