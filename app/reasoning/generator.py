"""
Dual Caption Generator (PERSON 2 ONLY)
=====================================
Primary Focus: Instagram & LinkedIn Prompting and Copy Generation
Folder Ownership: app/reasoning/
"""

import os
import json
import requests
from typing import Dict, Any, Optional, List
from app.schemas import IngestedPosterData, GeneratedCampaign

def generate_campaign(poster_data: IngestedPosterData, club_memory: Dict[str, Any]) -> GeneratedCampaign:
    """
    Generates tailored Instagram and LinkedIn social media campaigns using LLM reasoning.
    Attempts live LLM API generation if an API key is configured, with seamless fallback
    to deterministic template generation.
    
    Args:
        poster_data (IngestedPosterData): Output from vision parsing step.
        club_memory (Dict[str, Any]): Context guidelines from MCP server.
        
    Returns:
        GeneratedCampaign: Instagram caption, hashtags, carousel slide contents, and LinkedIn post.
    """
    hashtags = club_memory.get("default_hashtags", ["#CampusSync", "#Hackathon2026", "#BuildWithAI", "#CampusTech"])
    tone_guide = club_memory.get("tone_guide", "Action-oriented, inspiring, tech-forward")
    proven_hooks = club_memory.get("proven_hooks", ["Calling all student builders!"])
    
    # Attempt Live LLM Generation if API key is provided in environment
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")
    if api_key:
        try:
            live_campaign = _generate_with_live_llm(poster_data, club_memory, api_key, hashtags)
            if live_campaign:
                return live_campaign
        except Exception as e:
            print(f"[LLM Generator] Live API call failed, falling back to deterministic generation: {e}")
    
    # Deterministic Fallback Generator
    instagram_caption = (
        f"🔥 {poster_data.event_title} IS FINALLY HERE!\n\n"
        f"Get ready for an adrenaline-fueled building experience. "
        f"Join us at {poster_data.event_venue} on {poster_data.event_date}.\n\n"
        f"⚡ Vibe: {poster_data.vibe}\n"
        f"💡 Hook: {proven_hooks[0] if proven_hooks else 'Build future-ready tech!'}\n"
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
        f"🎯 Brand Tone: {tone_guide}\n\n"
        f"Whether you are a developer, designer, or problem solver, come build future-ready solutions with us. "
        f"Find registration details and schedule link below.\n\n"
        f"{' '.join(hashtags)}"
    )
    
    carousel_slides = [
        f"Slide 1: {poster_data.event_title} Overview",
        f"Slide 2: Schedule & Tracks ({poster_data.event_date})",
        f"Slide 3: Mentors & Swag Perks",
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

def _generate_with_live_llm(
    poster_data: IngestedPosterData,
    club_memory: Dict[str, Any],
    api_key: str,
    hashtags: list
) -> Optional[GeneratedCampaign]:
    """Helper function to execute live LLM prompt chain via REST API."""
    prompt = (
        f"You are an expert social media strategist for campus events.\n"
        f"Event Title: {poster_data.event_title}\n"
        f"Event Date: {poster_data.event_date}\n"
        f"Event Venue: {poster_data.event_venue}\n"
        f"Vibe: {poster_data.vibe}\n"
        f"Brand Tone Guide: {club_memory.get('tone_guide')}\n"
        f"Default Hashtags: {', '.join(hashtags)}\n\n"
        f"Generate a JSON object with fields:\n"
        f"- instagram_caption (string with emojis, call to action, and hashtags)\n"
        f"- linkedin_post (professional announcement with bullet points and hashtags)\n"
        f"- instagram_carousel_slides (array of 4 slide text titles)\n"
    )

    if os.getenv("GEMINI_API_KEY"):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        resp = requests.post(url, json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
            # Clean markdown codeblocks if present
            cleaned = raw_text.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(cleaned)
            return GeneratedCampaign(
                instagram_caption=parsed.get("instagram_caption"),
                instagram_carousel_slides=parsed.get("instagram_carousel_slides", []),
                instagram_hashtags=hashtags,
                linkedin_post=parsed.get("linkedin_post"),
                media_paths=[poster_data.cropped_square_path, poster_data.cropped_story_path]
            )
    return None

