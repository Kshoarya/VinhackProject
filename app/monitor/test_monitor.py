from app.monitor.simulator import AnalyticsSimulator
from app.monitor.tracker import TractionTracker


simulator = AnalyticsSimulator()
tracker = TractionTracker(
    min_impressions=100,
    engagement_threshold=2.0
)


for hours in [2, 4, 6]:

    metrics = simulator.get_snapshot(hours)

    analysis = tracker.analyze(metrics)

    print(f"\n--- {hours} HOURS ---")
    print(f"Simulated time: {metrics['simulated_at']}")
    print(f"Impressions: {analysis['impressions']}")
    print(f"Engagement rate: {analysis['engagement_rate']}%")
    print(f"Enough data: {analysis['enough_data']}")
    print(f"Needs optimization: {analysis['needs_optimization']}")