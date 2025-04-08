# billing_calculator.py
from decimal import Decimal

class BillingCalculator:
    def __init__(self, pricing_tiers):
        self.pricing_tiers = pricing_tiers  # {feature: {tier: (min, max, price)}}
        
    def calculate_charge(self, feature, units):
        """Calculate charge for a given feature usage"""
        if feature not in self.pricing_tiers:
            return Decimal('0.00')
            
        tiers = self.pricing_tiers[feature]
        remaining_units = units
        total_charge = Decimal('0.00')
        
        # Process each tier in order
        for tier in sorted(tiers.keys()):  # kesys are 'tier1', 'tier2', 'tier3', etc
            min_units, max_units, price_per_unit = tiers[tier]
            
            if remaining_units <= 0:
                break
                
            # Determine how many units fall in this tier
            if max_units is None:  # Last tier (no max)
                tier_units = remaining_units
            else:
                tier_units = min(remaining_units, max_units - min_units + 1)
                
            # Add to total charge
            total_charge += Decimal(str(tier_units)) * Decimal(str(price_per_unit))
            remaining_units -= tier_units
            
        return total_charge.quantize(Decimal('0.01'))
    
    def generate_invoice(self, user_usage):
        """Generate an invoice from user usage data"""
        invoice = {
            'line_items': [],
            'subtotal': Decimal('0.00'),
            'tax': Decimal('0.00'),
            'total': Decimal('0.00')
        }
        
        for feature, units in user_usage.items():
            charge = self.calculate_charge(feature, units)
            invoice['line_items'].append({
                'feature': feature,
                'units': units,
                'charge': charge
            })
            invoice['subtotal'] += charge
        
        # Calculate tax (simplified)
        invoice['tax'] = invoice['subtotal'] * Decimal('0.10')  # 10% tax
        invoice['total'] = invoice['subtotal'] + invoice['tax']
        
        return invoice