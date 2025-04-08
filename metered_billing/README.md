# Metered Billing System

This project implements a basic **metered billing system** that tracks usage and calculates billing based on predefined pricing tiers.

## Features

- Define customizable pricing plans
- Track usage for different customers
- Calculate charges based on usage and pricing rules

## Project Structure

```
metered_billing/
├── main.py                # Entry point for the billing system
├── pricing_config.py      # Configuration for pricing tiers
├── usage_tracker.py       # Tracks and stores usage data
├── billing_calculator.py  # Computes charges based on usage and pricing
```

## Usage

1. Configure pricing plans in `pricing_config.py`.
2. Track usage via `usage_tracker.py`.
3. Run `main.py` to simulate billing.
4. Charges are computed using the logic in `billing_calculator.py`.

## Requirements

- Python 3.7+
- No external dependencies required

## License

MIT License
