from django.test import TestCase
from .models import PriceSetting, PricingRule, PriceForecast

class PriceSettingTestCase(TestCase):
    def setUp(self):
        PriceSetting.objects.create(
            product_name='Test Product',
            base_price=100.00,
            discount=10.00,
            final_price=90.00,
            effective_date='2024-01-01'
        )

    def test_price_setting_creation(self):
        price_setting = PriceSetting.objects.get(product_name='Test Product')
        self.assertEqual(price_setting.final_price, 90.00)

class PricingRuleTestCase(TestCase):
    def setUp(self):
        PricingRule.objects.create(
            rule_name='Test Rule',
            rule_type='percentage_discount',
            parameters={'discount_percentage': 10},
            active=True
        )

    def test_pricing_rule_creation(self):
        pricing_rule = PricingRule.objects.get(rule_name='Test Rule')
        self.assertEqual(pricing_rule.rule_type, 'percentage_discount')

class PriceForecastTestCase(TestCase):
    def setUp(self):
        PriceForecast.objects.create(
            product_name='Test Product',
            forecast_date='2024-02-01',
            predicted_price=95.00,
            confidence=85,
            assumptions=['Test assumption']
        )

    def test_price_forecast_creation(self):
        price_forecast = PriceForecast.objects.get(product_name='Test Product')
        self.assertEqual(price_forecast.predicted_price, 95.00)
