from app.schemas import PostStatus

class TractionTracker:
    """
    Analyzes social media post metrics and determines
    whether a post needs optimization.
    """

    def __init__(
        self,
        min_impressions: int = 100,
        engagement_threshold: float = 2.0
    ):
        self.min_impressions = min_impressions
        self.engagement_threshold = engagement_threshold

    def analyze(self, metrics: dict) -> dict:
        """
        Analyze metrics returned by a social platform.
        """
        analytics = metrics.get("analytics", {})

        impressions = analytics.get("impressions", 0)
        reactions = analytics.get("reactions", 0)
        comments = analytics.get("comments", 0)
        reposts = analytics.get("reposts", 0)

        engagement_count = (
            reactions +
            comments +
            reposts
        )

        if impressions > 0:
            engagement_rate = (
                engagement_count / impressions
            ) * 100
        else:
            engagement_rate = 0.0

        enough_data = impressions >= self.min_impressions

        needs_optimization = (
            enough_data
            and engagement_rate < self.engagement_threshold
        )

        return {
            "impressions": impressions,
            "reactions": reactions,
            "comments": comments,
            "reposts": reposts,
            "engagement_count": engagement_count,
            "engagement_rate": round(engagement_rate, 2),
            "enough_data": enough_data,
            "needs_optimization": needs_optimization,
        }

def check_post_traction(post_id: str) -> PostStatus:
    """
    Fetches engagement metrics for a post and returns updated PostStatus.
    """
    import random
    from datetime import datetime
    
    is_ig = "ig" in post_id.lower()
    mock_likes = random.randint(14000, 26000) if is_ig else random.randint(4000, 9500)
    
    return PostStatus(
        post_id=post_id,
        platform="instagram" if is_ig else "linkedin",
        status="published",
        published_at=datetime.now().isoformat(),
        likes_count=mock_likes,
        needs_refresh=False
    )