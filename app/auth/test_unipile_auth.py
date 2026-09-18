from app.auth.unipile import UnipileAuth


user_id = "test_user_001"

notify_url = (
    "https://unestimated-nonelusive-tam.ngrok-free.dev"
    "/api/unipile/callback"
)


def main():
    auth = UnipileAuth()

    url = auth.create_linkedin_auth_link(
        user_id=user_id,
        notify_url=notify_url
    )

    print("\n==============================")
    print("HOSTED AUTH URL")
    print("==============================")
    print(url)
    print("==============================")


if __name__ == "__main__":
    main()