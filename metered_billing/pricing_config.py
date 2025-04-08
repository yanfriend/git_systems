# pricing_config.py
pricing_tiers = {
    'api_requests': {
        'tier1': (0, 1000, 0.0005),    # $0.0005 per request for first 1000
        'tier2': (1001, 10000, 0.0003), # $0.0003 per request for next 9000
        'tier3': (10001, None, 0.0001)  # $0.0001 per request beyond 10000
    },
    'storage_gb': {
        'tier1': (0, 10, 0.10),        # $0.10 per GB for first 10GB
        'tier2': (11, 100, 0.08),       # $0.08 per GB for next 90GB
        'tier3': (101, None, 0.05)      # $0.05 per GB beyond 100GB
    },
    'compute_hours': {
        'tier1': (0, 100, 0.15),       # $0.15 per hour for first 100 hours
        'tier2': (101, None, 0.10)      # $0.10 per hour beyond 100
    }
}