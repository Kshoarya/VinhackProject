import os
from datetime import datetime, timedelta, timezone
from typing import List, Optional
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

    def create_hosted_auth_link(
        self,
        user_id: Optional[str] = None,
        notify_url: Optional[str] = None,
        success_redirect_url: Optional[str] = None,
        failure_redirect_url: Optional[str] = None,
        providers: Optional[List[str]] = None,
        enable_unilogin: bool = True,
        expires_in_minutes: int = 60
    ) -> str:
        """
        Generates a Unipile Hosted Auth Wizard URL with redirection support.
        """
        expires_on = (
            datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes)
        ).strftime("%Y-%m-%dT%H:%M:%S.000Z")

        payload = {
            "type": "create",
            "providers": providers or ["LINKEDIN", "INSTAGRAM"],
            "api_url": self.dsn,
            "expiresOn": expires_on
        }

        if user_id:
            payload["name"] = str(user_id)

        if notify_url:
            payload["notify_url"] = notify_url

        if success_redirect_url:
            payload["success_redirect_url"] = success_redirect_url

        if failure_redirect_url:
            payload["failure_redirect_url"] = failure_redirect_url

        if enable_unilogin:
            payload["unilogin"] = {}

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

        print(f"[Unipile Hosted Auth Link] Status: {response.status_code}")
        print(f"[Unipile Hosted Auth Link] Response: {response.text}")

        if response.status_code not in (200, 201):
            raise RuntimeError(
                f"Unipile auth link creation failed: "
                f"{response.status_code} - {response.text}"
            )

        data = response.json()
        return data.get("url")

    def create_linkedin_auth_link(
        self,
        user_id: Optional[str] = "club_user",
        notify_url: Optional[str] = None,
        success_redirect_url: Optional[str] = None,
        failure_redirect_url: Optional[str] = None
    ) -> str:
        """Backwards-compatible helper for LinkedIn hosted auth link."""
        return self.create_hosted_auth_link(
            user_id=user_id,
            notify_url=notify_url,
            success_redirect_url=success_redirect_url,
            failure_redirect_url=failure_redirect_url,
            providers=["LINKEDIN"],
            enable_unilogin=True
        )