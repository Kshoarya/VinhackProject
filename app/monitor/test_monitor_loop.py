from app.monitor.monitor import TractionMonitor


monitor = TractionMonitor()

result = monitor.check(4)

print(result)