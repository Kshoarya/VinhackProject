from app.auth.unipile import UnipileAuth


def main():
    auth = UnipileAuth()

    url = auth.create_linkedin_auth_link()

    print("\n==============================")
    print("HOSTED AUTH URL")
    print("==============================")
    print(url)
    print("==============================")


if __name__ == "__main__":
    main()