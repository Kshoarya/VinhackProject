#common interface

from abc import ABC, abstractmethod

class SocialPublisher(ABC):
    """
    Base interface for all social media publishers.

    Every platform publisher must implement:
    - publish()
    - get_metrics()
    """

    @abstractmethod
    def publish(self, caption: str, image_url: str) -> str:
        """
        Publish content to the social media platform.

        Returns:
            str: ID of the created post.
        """
        pass

    @abstractmethod
    def get_metrics(self, post_id: str) -> dict:
        """
        Get performance metrics for a published post.

        Returns:
            dict: Platform metrics such as likes, comments, views, etc.
        """
        pass

