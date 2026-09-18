from app.dispatch.base import SocialPublisher  #Any social media publisher we create must know how to publish() and get_metrics().

class Publisher:  #Decides which platform should receive the request.

    def __init__(self):
        self.publishers : dict[str, SocialPublisher] = {}  #creating a platform → publisher mapping.

    def register(self, platform: str, publisher: SocialPublisher): #add a platform publisher to our dictionary.
        self.publishers[platform] = publisher

    def publish(
        self,
        platform: str,
        caption: str,
        image_url: str
    ) -> str:
        """
        Publish content using the registered platform publisher.
        """

        if platform not in self.publishers:
            raise ValueError(
                f"No publisher registered for platform: {platform}"
            )

        publisher = self.publishers[platform]

        return publisher.publish(
            caption=caption,
            image_url=image_url
        )

    def get_metrics(self, platform: str, post_id: str) -> dict:
        """
        Get metrics for a published post.
        """

        if platform not in self.publishers:
            raise ValueError(
                f"No publisher registered for platform: {platform}"
            )

        publisher = self.publishers[platform]

        return publisher.get_metrics(post_id)