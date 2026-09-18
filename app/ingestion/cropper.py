"""
OpenCV Smart Cropper Module (PERSON 2 ONLY)
===========================================
Primary Focus: OpenCV Smart Image Resizing (1:1 Feed & 9:16 Story Crops)
Folder Ownership: app/ingestion/
"""

import os
from typing import Tuple

def crop_poster_image(image_path: str) -> Tuple[str, str]:
    """
    OpenCV Smart Cropper Function.
    
    Args:
        image_path (str): Path to original uploaded poster image.
        
    Returns:
        Tuple[str, str]: (cropped_square_path, cropped_story_path)
    """
    os.makedirs("uploads/cropped", exist_ok=True)
    base_name = os.path.basename(image_path)
    name, ext = os.path.splitext(base_name)
    
    cropped_square_path = f"uploads/cropped/{name}_square{ext}"
    cropped_story_path = f"uploads/cropped/{name}_story{ext}"
    
    # TODO (Person 2): Replace with OpenCV face/text-aware focal crop algorithm
    # e.g., using cv2.imread(), calculating key point saliency, and saving cropped frames.
    
    if not os.path.exists(cropped_square_path) and os.path.exists(image_path):
        with open(image_path, "rb") as src, open(cropped_square_path, "wb") as dst:
            dst.write(src.read())
            
    if not os.path.exists(cropped_story_path) and os.path.exists(image_path):
        with open(image_path, "rb") as src, open(cropped_story_path, "wb") as dst:
            dst.write(src.read())

    return cropped_square_path, cropped_story_path
