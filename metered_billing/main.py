# main.py
from usage_tracker import UsageTracker
from billing_calculator import BillingCalculator
from pricing_config import pricing_tiers as pricing_tiers
from datetime import datetime, timedelta

def main():
    # Initialize services
    usage_tracker = UsageTracker()
    billing_calculator = BillingCalculator(pricing_tiers)
    
    # Simulate some usage
    user_id = "customer_123"
    usage_tracker.record_usage(user_id, 'api_requests', 500)
    usage_tracker.record_usage(user_id, 'api_requests', 1200)
    usage_tracker.record_usage(user_id, 'storage_gb', 15)
    usage_tracker.record_usage(user_id, 'compute_hours', 150)
    
    # Get usage for the current period
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=30)
    user_usage = usage_tracker.get_user_usage(user_id, start_date, end_date)
    
    print(f"Usage for user {user_id}:")
    for feature, units in user_usage.items():
        print(f"- {feature}: {units} units")
    
    # Generate invoice
    invoice = billing_calculator.generate_invoice(user_usage)
    
    print("\nInvoice:")
    print(f"Subtotal: ${invoice['subtotal']}")
    print(f"Tax (10%): ${invoice['tax']}")
    print(f"Total: ${invoice['total']}")
    
    print("\nLine Items:")
    for item in invoice['line_items']:
        print(f"- {item['feature']}: {item['units']} units = ${item['charge']}")

if __name__ == "__main__":
    main()