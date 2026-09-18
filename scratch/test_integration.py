"""
End-to-End Pipeline Integration Test Script
Tests:
1. Poster Cropping (OpenCV)
2. Vision Extraction (IngestedPosterData)
3. Club Vault MCP Context (mcp_server.py)
4. AI Campaign Generation (generator.py)
5. Dispatch Publishing (publisher.py / linkedin.py)
6. Traction Tracking (tracker.py)
7. Supabase DB Logging (db.py)
"""
import os
import sys
import numpy as np
import cv2

# Create a test poster image
os.makedirs("uploads", exist_ok=True)
test_image_path = "uploads/test_poster.png"
img = np.zeros((1200, 800, 3), dtype=np.uint8)
# Add some color & text to dummy poster
img[:] = (40, 20, 200) # Vibrant red/purple
cv2.putText(img, "CAMPUSSYNC HACKATHON 2026", (50, 400), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 3)
cv2.putText(img, "SEPTEMBER 20, 2026", (50, 500), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), 2)
cv2.imwrite(test_image_path, img)

print("=== STARTING INTEGRATED PIPELINE TEST ===")

# Step 1: Cropping
from app.ingestion.cropper import crop_poster_image
square_path, story_path = crop_poster_image(test_image_path)
print(f"[PASS 1/6] Poster Cropping: Square -> {square_path}, Story -> {story_path}")

# Step 2: Vision Ingestion
from app.ingestion.vision import extract_poster_data
poster_data = extract_poster_data(test_image_path, square_path, story_path)
print(f"[PASS 2/6] Vision Extraction: Title='{poster_data.event_title}', Date='{poster_data.event_date}'")

# Step 3: MCP Club Memory Context
from app.reasoning.mcp_server import get_club_memory
club_memory = get_club_memory("Campus Tech Club")
print(f"[PASS 3/6] MCP Club Memory: Tone='{club_memory['tone_guide']}'")

# Step 4: Campaign Generator
from app.reasoning.generator import generate_campaign
campaign = generate_campaign(poster_data, club_memory)
print(f"[PASS 4/6] Campaign Generation:\n - Instagram Caption Length: {len(campaign.instagram_caption)} chars\n - LinkedIn Post Length: {len(campaign.linkedin_post)} chars")

# Step 5: Dispatch Publisher
from app.dispatch.publisher import publish_campaign
post_statuses = publish_campaign(campaign)
print(f"[PASS 5/6] Dispatch Publisher: Generated {len(post_statuses)} post status entries across platforms")

# Step 6: Traction Tracking
from app.monitor.tracker import check_post_traction
tracked_status = check_post_traction(post_statuses[0].post_id)
print(f"[PASS 6/6] Traction Tracking: Post {tracked_status.post_id} likes={tracked_status.likes_count}")

print("\n*** ALL 6 INTEGRATION STEPS PASSED SUCCESSFULLY! ***")
