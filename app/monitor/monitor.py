from app.monitor.simulator import AnalyticsSimulator
from app.monitor.tracker import TractionTracker


class TractionMonitor:
    """
    Monitors post traction at 2-hour checkpoints.
    """

    def __init__(self):
        self.simulator = AnalyticsSimulator()

        self.tracker = TractionTracker(
            min_impressions=100,
            engagement_threshold=2.0
        )

    def check(self, hours_elapsed: int) -> dict:
        """
        Get analytics for a checkpoint and analyze traction.

        Returns:
            dict: Structured monitoring result.
        """

        metrics = self.simulator.get_snapshot(hours_elapsed)

        analysis = self.tracker.analyze(metrics)

        return {
            "hours_elapsed": hours_elapsed,
            "simulated_at": metrics["simulated_at"],
            "metrics": {
                "impressions": analysis["impressions"],
                "reactions": analysis["reactions"],
                "comments": analysis["comments"],
                "reposts": analysis["reposts"],
            },
            "engagement_rate": analysis["engagement_rate"],
            "enough_data": analysis["enough_data"],
            "needs_optimization": analysis["needs_optimization"],
        }

    def run_demo(self):
        """
        Simulate monitoring at 2, 4, and 6 hours.
        """

        for hours in [2, 4, 6]:

            result = self.check(hours)

            print(f"\n===== {hours}-HOUR CHECK =====")
            print(f"Simulated time: {result['simulated_at']}")
            print(f"Impressions: {result['metrics']['impressions']}")
            print(
                f"Engagement rate: "
                f"{result['engagement_rate']}%"
            )

            if result["needs_optimization"]:
                print("ACTION: Optimization required")
            else:
                print("ACTION: Continue monitoring")