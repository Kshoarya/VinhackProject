import os
from datetime import datetime, timedelta, timezone

import requests
from dotenv import load_dotenv

load_dotenv()


class UnipileAuth:

    def __init__(self):
        self.dsn = os.getenv("UNIPILE_DSN")
        self.api_key = os.getenv("UNIPILE_API_KEY")

        if not self.dsn:
            raise ValueError("UNIPILE_DSN is not configured")

        if not self.api_key:
            raise ValueError("UNIPILE_API_KEY is not configured")

        if not self.dsn.startswith(("http://", "https://")):
            self.dsn = f"https://{self.dsn}"

    def create_linkedin_auth_link(self):

        expires_on = (
            datetime.now(timezone.utc)
            + timedelta(minutes=10)
        ).strftime("%Y-%m-%dT%H:%M:%S.000Z")

        payload = {
            "type": "create",
            "providers": ["LINKEDIN"],
            "api_url": self.dsn,
            "expiresOn": expires_on
        }

        response = requests.post(
            f"{self.dsn}/api/v1/hosted/accounts/link",
            headers={
                "X-API-KEY": self.api_key,
                "accept": "application/json",
                "content-type": "application/json"
            },
            json=payload,
            timeout=30
        )

        print("Status:", response.status_code)
        print("Response:", response.text)

        if response.status_code not in (200, 201):
            raise RuntimeError(
                f"Unipile auth link creation failed: "
                f"{response.status_code} - {response.text}"
            )

        data = response.json()

        return data["url"]