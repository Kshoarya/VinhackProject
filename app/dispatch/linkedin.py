from pathlib import Path
import os
import requests
from dotenv import load_dotenv

from app.dispatch.base import SocialPublisher


# Load environment variables from root or local .env
load_dotenv()
load_dotenv(Path(__file__).parent.parent.parent / ".env")
load_dotenv(Path(__file__).parent / ".env")


class LinkedInPublisher(SocialPublisher):
    """
    Handles publishing and metric retrieval for LinkedIn through Unipile.
    """

    def __init__(self, account_id: str = None):
        self.dsn = os.getenv("UNIPILE_DSN")
        self.api_key = os.getenv("UNIPILE_API_KEY")

        if not self.dsn:
            raise ValueError("UNIPILE_DSN is not configured")

        if not self.api_key:
            raise ValueError("UNIPILE_API_KEY is not configured")

        if not self.dsn.startswith(("http://", "https://")):
            self.dsn = f"https://{self.dsn}"

        self.account_id = account_id or os.getenv("UNIPILE_ACCOUNT_ID")
        
        # If no account_id or if specified ID is missing, auto-fetch active connected LinkedIn account from Unipile
        if not self.account_id:
            active_id = self._fetch_active_linkedin_account_id()
            if active_id:
                self.account_id = active_id

        if not self.account_id:
            raise ValueError("No active LinkedIn account found on Unipile. Please connect an account first.")

    def _fetch_active_linkedin_account_id(self):
        """Queries Unipile API for any active connected LinkedIn account ID."""
        try:
            res = requests.get(
                f"{self.dsn}/api/v1/accounts",
                headers={"X-API-KEY": self.api_key},
                timeout=10
            )
            if res.status_code == 200:
                data = res.json()
                items = data.get("items", [])
                for item in items:
                    if item.get("type") == "LINKEDIN" and item.get("id"):
                        return item.get("id")
        except Exception as e:
            print(f"[LinkedInPublisher] Error auto-fetching active account ID: {e}")
        return None

    def publish(self, caption: str, image_path: str) -> str:
        """
        Publish an image post to LinkedIn through Unipile.

        Args:
            caption: Text of the LinkedIn post.
            image_path: Local path to the image.

        Returns:
            str: ID of the created LinkedIn post.
        """

        image_file_path = Path(image_path)

        if not image_file_path.exists():
            raise FileNotFoundError(
                f"Image not found: {image_file_path}"
            )

        def _do_post(acc_id: str):
            with open(image_file_path, "rb") as image_file:
                files = {
                    "attachments": (
                        image_file_path.name,
                        image_file,
                        "image/jpeg"
                    )
                }
                return requests.post(
                    f"{self.dsn}/api/v1/posts",
                    headers={
                        "X-API-KEY": self.api_key
                    },
                    data={
                        "account_id": acc_id,
                        "text": caption
                    },
                    files=files
                )

        response = _do_post(self.account_id)

        # If account was expired or not found, try auto-refreshing active account ID once
        if response.status_code in (404, 400) and "Account not found" in response.text:
            print("[LinkedInPublisher] Account ID expired or not found. Auto-discovering active connected LinkedIn account...")
            active_id = self._fetch_active_linkedin_account_id()
            if active_id and active_id != self.account_id:
                self.account_id = active_id
                response = _do_post(self.account_id)

        if response.status_code != 201:
            raise RuntimeError(
                f"LinkedIn publish failed: "
                f"{response.status_code} - {response.text}"
            )

        data = response.json()

        print("LinkedIn post created successfully.")
        print("Response:", data)

        return data["post_id"]

    def get_metrics(self, post_id: str) -> dict:
        """
        Get metrics for a LinkedIn post.
        """

        response = requests.get(
            f"{self.dsn}/api/v1/posts/{post_id}",
            params={
                "account_id": self.account_id
            },
            headers={
                "X-API-KEY": self.api_key
            }
        )

        if response.status_code != 200:
            raise RuntimeError(
                f"LinkedIn metrics request failed: "
                f"{response.status_code} - {response.text}"
            )

        return response.json()