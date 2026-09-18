"""
Vision LLM Poster Parser Module (PERSON 2 ONLY)
==============================================
Primary Focus: Visual Information & Text Extraction from Event Posters
Folder Ownership: app/ingestion/
"""

from app.schemas import IngestedPosterData

def extract_poster_data(image_path: str, square_path: str, story_path: str) -> IngestedPosterData:
    """
    Parses poster image using a Vision Model (Gemini Vision / OpenAI Vision).
    
    Args:
        image_path (str): Path to original poster image.
        square_path (str): Path to 1:1 cropped image.
        story_path (str): Path to 9:16 cropped image.
        
    Returns:
        IngestedPosterData: Structured data schema containing parsed title, date, venue, vibe, & text.
    """
    # TODO (Person 2): Integrate Gemini 2.5 Flash Vision API / OpenAI Vision API
    # Prompt the vision model to return JSON with title, date, venue, vibe, and extracted text.
    
    return IngestedPosterData(
        cropped_square_path=square_path,
        cropped_story_path=story_path,
        extracted_text="CAMPUSSYNC HACKATHON 2026 - Join the 20-hour building sprint at Innovation Lab on Sept 20.",
        event_title="CampusSync 2026 Hackathon",
        event_date="September 20, 2026 • 09:00 AM IST",
        event_venue="Main Auditorium & Innovation Lab",
        vibe="High-Energy, Technical, Competitive & Innovative"
    )
