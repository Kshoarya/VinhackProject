from datetime import datetime, timedelta


class AnalyticsSimulator:
    """
    Simulates analytics snapshots at 2-hour intervals
    for demo purposes.
    """

    def __init__(self):
        self.start_time = datetime.now()

        self.snapshots = [
            {
                "impressions": 500,
                "reactions": 8,
                "comments": 2,
                "reposts": 1,
            },
            {
                "impressions": 900,
                "reactions": 9,
                "comments": 2,
                "reposts": 1,
            },
            {
                "impressions": 1400,
                "reactions": 10,
                "comments": 2,
                "reposts": 1,
            },
        ]

    def get_snapshot(self, hours_elapsed: int) -> dict:
        """
        Return simulated analytics for a given number
        of hours after publication.
        """

        if hours_elapsed <= 0 or hours_elapsed % 2 != 0:
            raise ValueError(
                "hours_elapsed must be a positive multiple of 2."
            )

        snapshot_index = (hours_elapsed // 2) - 1

        if snapshot_index >= len(self.snapshots):
            snapshot_index = len(self.snapshots) - 1

        analytics = self.snapshots[snapshot_index]

        return {
            "analytics": analytics,
            "simulated_at": self.start_time + timedelta(
                hours=hours_elapsed
            )
        }