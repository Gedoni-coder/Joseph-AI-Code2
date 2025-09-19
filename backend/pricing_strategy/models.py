from django.db import models
from django.db.models import JSONField
import uuid

class PriceSetting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_name = models.CharField(max_length=200)
    base_price = models.FloatField()
    discount = models.FloatField(default=0.0)
    final_price = models.FloatField()
    effective_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"PriceSetting: {self.product_name} - {self.final_price}"

class PricingRule(models.Model):
    RULE_TYPE_CHOICES = [
        ('percentage_discount', 'Percentage Discount'),
        ('fixed_discount', 'Fixed Discount'),
        ('tiered_pricing', 'Tiered Pricing'),
        ('bundle_pricing', 'Bundle Pricing'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rule_name = models.CharField(max_length=200)
    rule_type = models.CharField(max_length=50, choices=RULE_TYPE_CHOICES)
    parameters = JSONField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"PricingRule: {self.rule_name}"

class PriceForecast(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_name = models.CharField(max_length=200)
    forecast_date = models.DateField()
    predicted_price = models.FloatField()
    confidence = models.IntegerField()
    assumptions = JSONField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"PriceForecast: {self.product_name} - {self.predicted_price} on {self.forecast_date}"
