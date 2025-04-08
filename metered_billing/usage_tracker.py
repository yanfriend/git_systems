# usage_tracker.py
import time
from datetime import datetime, timedelta
from collections import defaultdict

class UsageTracker:
    def __init__(self):
        self.user_usage = defaultdict(dict)  # {user_id: {feature: usage_count}}
        self.usage_events = []  # For audit purposes
        
    def record_usage(self, user_id, feature, units=1):
        """Record usage of a feature by a user"""
        timestamp = datetime.utcnow()
        
        # Update current usage count
        if feature not in self.user_usage[user_id]:
            self.user_usage[user_id][feature] = 0
        self.user_usage[user_id][feature] += units
        
        # Log the event
        self.usage_events.append({
            'user_id': user_id,
            'feature': feature,
            'units': units,
            'timestamp': timestamp
        })
        
        return True
    
    def get_user_usage(self, user_id, start_date=None, end_date=None):
        """Get usage for a user within a date range"""
        if start_date is None:
            start_date = datetime.utcnow() - timedelta(days=30)
        if end_date is None:
            end_date = datetime.utcnow()
            
        # Filter events by date range
        filtered = [
            event for event in self.usage_events 
            if event['user_id'] == user_id 
            and start_date <= event['timestamp'] <= end_date
        ]
        
        # Sum usage by feature
        usage_summary = defaultdict(int)
        for event in filtered:
            usage_summary[event['feature']] += event['units']
            
        return dict(usage_summary)