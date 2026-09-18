import os
import requests
from dotenv import load_dotenv

load_dotenv()

dsn = os.getenv("UNIPILE_DSN")
api_key = os.getenv("UNIPILE_API_KEY")

if not dsn.startswith("http"):
    dsn = "https://" + dsn

response = requests.get(
    f"{dsn}/api/v1/accounts",
    headers={
        "X-API-KEY": api_key,
        "accept": "application/json"
    },
    timeout=30
)

print("Status:", response.status_code)
print("Response:")
print(response.text)