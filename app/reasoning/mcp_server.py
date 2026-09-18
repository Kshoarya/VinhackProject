"""
MCP Club Memory Server (PERSON 2 ONLY)
=====================================
Primary Focus: Club History, Past High-Performing Hooks, & Tone Memory Server
Folder Ownership: app/reasoning/
"""

from typing import Dict, Any

def get_club_memory(club_name: str) -> Dict[str, Any]:
    """
    Fetches stored memory guidelines, past engagement hooks, and brand tone for a specific club.
    
    Args:
        club_name (str): Name of campus club.
        
    Returns:
        Dict[str, Any]: Brand guidelines, tone instructions, and hashtag presets.
    """
    # TODO (Person 2): Connect to Model Context Protocol (MCP) server or local vector/JSON memory store.
    
    return {
        "club_name": club_name,
        "tone_guide": "Action-oriented, inspiring, youth-focused, tech-forward",
        "audience": "University students, developers, designers, & campus builders",
        "default_hashtags": ["#CampusSync", "#Hackathon2026", "#BuildWithAI", "#CampusTech"],
        "proven_hooks": [
            "Ready to turn your idea into reality in 20 hours?",
            "Calling all student builders!",
            "Don't miss the biggest campus hackathon of the year."
        ]
    }
