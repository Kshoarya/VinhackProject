from pathlib import Path
import os
import requests
from dotenv import load_dotenv

from app.dispatch.base import SocialPublisher


load_dotenv(Path(__file__).parent / ".env")


class LinkedInPublisher(SocialPublisher):
    """
    Handles publishing and metric retrieval for LinkedIn through Unipile.
    """

    def __init__(self):
        self.dsn = os.getenv("UNIPILE_DSN")
        self.api_key = os.getenv("UNIPILE_API_KEY")
        self.account_id = os.getenv("UNIPILE_ACCOUNT_ID")

        if not self.dsn:
            raise ValueError("UNIPILE_DSN is not configured")

        if not self.api_key:
            raise ValueError("UNIPILE_API_KEY is not configured")

        if not self.account_id:
            raise ValueError("UNIPILE_ACCOUNT_ID is not configured")

        if not self.dsn.startswith(("http://", "https://")):
            self.dsn = f"https://{self.dsn}"

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

        with open(image_file_path, "rb") as image_file:

            files = {
                "attachments": (
                    image_file_path.name,
                    image_file,
                    "image/jpeg"
                )
            }

            response = requests.post(
                f"{self.dsn}/api/v1/posts",
                headers={
                    "X-API-KEY": self.api_key
                },
                data={
                    "account_id": self.account_id,
                    "text": caption
                },
                files=files
            )

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