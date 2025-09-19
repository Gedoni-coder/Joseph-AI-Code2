from django.core.management.base import BaseCommand
from pricing_strategy.models import PriceSetting, PricingRule, PriceForecast
from datetime import date, datetime
import uuid

class Command(BaseCommand):
    help = 'Populate pricing strategy data'

    def handle(self, *args, **options):
        self.stdout.write('Populating pricing strategy data...')

        # Create Price Settings
        PriceSetting.objects.all().delete()
        price_settings = [
            {
                'id': uuid.uuid4(),
                'product_name': 'Premium Widget',
                'base_price': 100.00,
                'discount': 10.00,
                'final_price': 90.00,
                'effective_date': date(2024, 1, 1),
                'expiration_date': date(2024, 12, 31),
            },
            {
                'id': uuid.uuid4(),
                'product_name': 'Standard Widget',
                'base_price': 50.00,
                'discount': 5.00,
                'final_price': 45.00,
                'effective_date': date(2024, 1, 1),
                'expiration_date': date(2024, 12, 31),
            },
            {
                'id': uuid.uuid4(),
                'product_name': 'Basic Widget',
                'base_price': 25.00,
                'discount': 0.00,
                'final_price': 25.00,
                'effective_date': date(2024, 1, 1),
                'expiration_date': date(2024, 12, 31),
            },
        ]
        for ps in price_settings:
            PriceSetting.objects.create(**ps)

        # Create Pricing Rules
        PricingRule.objects.all().delete()
        pricing_rules = [
            {
                'id': uuid.uuid4(),
                'rule_name': 'Volume Discount',
                'rule_type': 'percentage_discount',
                'parameters': {
                    'min_quantity': 100,
                    'discount_percentage': 15,
                },
                'active': True,
            },
            {
                'id': uuid.uuid4(),
                'rule_name': 'Loyalty Discount',
                'rule_type': 'fixed_discount',
                'parameters': {
                    'customer_type': 'loyal',
                    'discount_amount': 10.00,
                },
                'active': True,
            },
            {
                'id': uuid.uuid4(),
                'rule_name': 'Tiered Pricing',
                'rule_type': 'tiered_pricing',
                'parameters': {
                    'tiers': [
                        {'min_quantity': 1, 'max_quantity': 49, 'price_per_unit': 25.00},
                        {'min_quantity': 50, 'max_quantity': 99, 'price_per_unit': 22.50},
                        {'min_quantity': 100, 'max_quantity': None, 'price_per_unit': 20.00},
                    ],
                },
                'active': True,
            },
        ]
        for pr in pricing_rules:
            PricingRule.objects.create(**pr)

        # Create Price Forecasts
        PriceForecast.objects.all().delete()
        price_forecasts = [
            {
                'id': uuid.uuid4(),
                'product_name': 'Premium Widget',
                'forecast_date': date(2024, 2, 1),
                'predicted_price': 95.00,
                'confidence': 85,
                'assumptions': ['Market demand stable', 'Cost inflation 3%'],
            },
            {
                'id': uuid.uuid4(),
                'product_name': 'Standard Widget',
                'forecast_date': date(2024, 2, 1),
                'predicted_price': 47.50,
                'confidence': 78,
                'assumptions': ['Competitor pricing stable', 'Raw material costs steady'],
            },
            {
                'id': uuid.uuid4(),
                'product_name': 'Basic Widget',
                'forecast_date': date(2024, 2, 1),
                'predicted_price': 26.00,
                'confidence': 92,
                'assumptions': ['High volume production', 'Minimal cost fluctuations'],
            },
        ]
        for pf in price_forecasts:
            PriceForecast.objects.create(**pf)

        self.stdout.write(self.style.SUCCESS('Successfully populated pricing strategy data'))
