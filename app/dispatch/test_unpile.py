from pathlib import Path
import os
import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

dsn = os.getenv("UNIPILE_DSN")
api_key = os.getenv("UNIPILE_API_KEY")
account_id = os.getenv("UNIPILE_ACCOUNT_ID")

if not dsn or not api_key or not account_id:
    raise RuntimeError(
        "UNIPILE_DSN, UNIPILE_API_KEY and UNIPILE_ACCOUNT_ID "
        "must be set in .env"
    )

if not dsn.startswith(("http://", "https://")):
    dsn = f"https://{dsn}"

image_path = Path(__file__).parent / "images.jpeg"

with open(image_path, "rb") as image_file:

    files = {
        "attachments": (
            "images.jpeg",
            image_file,
            "image/jpeg"
        )
    }

    response = requests.post(
        f"{dsn}/api/v1/posts",
        headers={
            "X-API-KEY": api_key
        },
        data={
    "account_id": account_id,
    "text": """🤖 AI agents don’t just generate — they think, plan, decide, and act.

That’s exactly what we’re building with our AI Social Media Agent — a system that goes beyond simply scheduling posts.

It can analyze performance, understand engagement metrics, adapt content strategies, and continuously optimize what gets posted and when. 📊 → 🧠 → ⚡

Instead of:

Create → Post → Forget

We’re building:

Observe → Analyze → Plan → Act → Learn → Improve

The goal? A social media manager that doesn’t just manage content — it learns from every interaction and gets smarter over time.

#AIAgents #GenerativeAI #AI #MachineLearning #SocialMediaAutomation #AIEngineering #BuildInPublic #TechInnovation"""
},
        files=files
    )

print("Status:", response.status_code)
print("Response:", response.text)