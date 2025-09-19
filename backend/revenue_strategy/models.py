from django.db import models

class RevenueStream(models.Model):
    TYPE_CHOICES = [
        ('subscription', 'Subscription'),
        ('one-time', 'One-time'),
        ('usage-based', 'Usage-based'),
        ('commission', 'Commission'),
        ('advertising', 'Advertising'),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    current_revenue = models.FloatField()
    forecast_revenue = models.FloatField()
    growth = models.FloatField()
    margin = models.FloatField()
    customers = models.IntegerField()
    avg_revenue_per_customer = models.FloatField()

    def __str__(self):
        return f"{self.name} ({self.type})"

class RevenueScenario(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    probability = models.FloatField()
    timeframe = models.CharField(max_length=50)
    total_revenue = models.FloatField()
    revenue_growth = models.FloatField()
    key_assumptions = models.JSONField()
    risks = models.JSONField()

    def __str__(self):
        return self.name

class ChurnReason(models.Model):
    IMPACT_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    reason = models.CharField(max_length=100)
    percentage = models.FloatField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)

    def __str__(self):
        return self.reason

class ChurnAnalysis(models.Model):
    segment = models.CharField(max_length=100)
    churn_rate = models.FloatField()
    customers = models.IntegerField()
    revenue_at_risk = models.FloatField()
    average_lifetime = models.FloatField()
    retention_cost = models.FloatField()
    churn_reasons = models.ManyToManyField(ChurnReason)

    def __str__(self):
        return f"Churn Analysis - {self.segment}"

class UpsellOpportunity(models.Model):
    customer = models.CharField(max_length=100)
    current_plan = models.CharField(max_length=100)
    suggested_plan = models.CharField(max_length=100)
    current_mrr = models.FloatField()
    potential_mrr = models.FloatField()
    probability_score = models.FloatField()
    time_to_upgrade = models.IntegerField()
    triggers = models.JSONField()

    def __str__(self):
        return f"{self.customer} - {self.current_plan} → {self.suggested_plan}"

class RevenueMetric(models.Model):
    TREND_CHOICES = [
        ('up', 'Up'),
        ('down', 'Down'),
        ('stable', 'Stable'),
    ]

    name = models.CharField(max_length=100)
    value = models.FloatField()
    unit = models.CharField(max_length=20)
    change = models.FloatField()
    trend = models.CharField(max_length=10, choices=TREND_CHOICES)
    period = models.CharField(max_length=50)
    benchmark = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

class DiscountAnalysis(models.Model):
    discount_type = models.CharField(max_length=100)
    discount_rate = models.FloatField()
    usage = models.FloatField()
    revenue_impact = models.FloatField()
    conversion_lift = models.FloatField()
    margin_impact = models.FloatField()
    customer_segment = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.discount_type} - {self.customer_segment}"

class ChannelPerformance(models.Model):
    channel = models.CharField(max_length=100)
    revenue = models.FloatField()
    customers = models.IntegerField()
    avg_order_value = models.FloatField()
    acquisition_cost = models.FloatField()
    profitability = models.FloatField()
    growth = models.FloatField()

    def __str__(self):
        return self.channel
