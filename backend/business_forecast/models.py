from django.db import models
import uuid
import os
from django.core.files.storage import default_storage

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='business_forecast/documents/%Y/%m/%d/')
    file_type = models.CharField(max_length=50)
    file_size = models.IntegerField()  # in bytes
    uploaded_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"Document: {self.name}"

    def delete(self, *args, **kwargs):
        if self.file:
            if default_storage.exists(self.file.name):
                default_storage.delete(self.file.name)
        super().delete(*args, **kwargs)

class CustomerProfile(models.Model):
    segment = models.CharField(max_length=100)
    demand_assumption = models.IntegerField()
    growth_rate = models.FloatField()
    retention = models.IntegerField()
    avg_order_value = models.FloatField()
    seasonality = models.IntegerField()

    def __str__(self):
        return f"{self.segment} Profile"

class RevenueProjection(models.Model):
    period = models.CharField(max_length=50)
    projected = models.FloatField()
    conservative = models.FloatField()
    optimistic = models.FloatField()
    actual_to_date = models.FloatField(null=True, blank=True)
    confidence = models.IntegerField()

    def __str__(self):
        return f"Revenue Projection {self.period}"

class CostStructure(models.Model):
    COGS = "COGS"
    OPERATING = "Operating"
    TYPE_CHOICES = [
        (COGS, "COGS"),
        (OPERATING, "Operating"),
    ]

    FIXED = "Fixed"
    VARIABLE = "Variable"
    SEMI_VARIABLE = "Semi-Variable"
    VARIABILITY_CHOICES = [
        (FIXED, "Fixed"),
        (VARIABLE, "Variable"),
        (SEMI_VARIABLE, "Semi-Variable"),
    ]

    UP = "up"
    DOWN = "down"
    STABLE = "stable"
    TREND_CHOICES = [
        (UP, "up"),
        (DOWN, "down"),
        (STABLE, "stable"),
    ]

    category = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.FloatField()
    percentage = models.FloatField()
    variability = models.CharField(max_length=15, choices=VARIABILITY_CHOICES)
    trend = models.CharField(max_length=10, choices=TREND_CHOICES)

    def __str__(self):
        return f"{self.category} Cost Structure"

class CashFlowForecast(models.Model):
    month = models.CharField(max_length=50)
    cash_inflow = models.FloatField()
    cash_outflow = models.FloatField()
    net_cash_flow = models.FloatField()
    cumulative_cash = models.FloatField()
    working_capital = models.FloatField()

    def __str__(self):
        return f"Cash Flow Forecast {self.month}"

class KPI(models.Model):
    UP = "up"
    DOWN = "down"
    STABLE = "stable"
    TREND_CHOICES = [
        (UP, "up"),
        (DOWN, "down"),
        (STABLE, "stable"),
    ]

    name = models.CharField(max_length=100)
    current = models.FloatField()
    target = models.FloatField()
    unit = models.CharField(max_length=20)
    trend = models.CharField(max_length=10, choices=TREND_CHOICES)
    category = models.CharField(max_length=100)
    frequency = models.CharField(max_length=50)

    def __str__(self):
        return f"KPI: {self.name}"

class ScenarioPlanning(models.Model):
    BEST_CASE = "Best Case"
    BASE_CASE = "Base Case"
    WORST_CASE = "Worst Case"
    SCENARIO_CHOICES = [
        (BEST_CASE, "Best Case"),
        (BASE_CASE, "Base Case"),
        (WORST_CASE, "Worst Case"),
    ]

    scenario = models.CharField(max_length=20, choices=SCENARIO_CHOICES)
    revenue = models.FloatField()
    costs = models.FloatField()
    profit = models.FloatField()
    probability = models.FloatField()
    key_assumptions = models.JSONField()

    def __str__(self):
        return f"Scenario: {self.scenario}"
