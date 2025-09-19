from django.db import models
from django.db.models import JSONField
import uuid

class BudgetForecast(models.Model):
    TYPE_CHOICES = [
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    period = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    revenue = models.FloatField()
    expenses = models.FloatField()
    net_income = models.FloatField()
    confidence = models.IntegerField()
    assumptions = JSONField()
    last_updated = models.DateTimeField(auto_now=True)
    variance = models.FloatField()
    actual_revenue = models.FloatField(null=True, blank=True)
    actual_expenses = models.FloatField(null=True, blank=True)
    actual_net_income = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Budget Forecast {self.period}"

class CashFlowProjection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    opening_balance = models.FloatField()
    operating_cash = models.FloatField()
    accounts_receivable = models.FloatField()
    other_income = models.FloatField()
    operating_expenses = models.FloatField()
    accounts_payable = models.FloatField()
    capital_expenditure = models.FloatField()
    debt_service = models.FloatField()
    net_cash_flow = models.FloatField()
    closing_balance = models.FloatField()
    liquidity_ratio = models.FloatField()
    days_of_cash = models.IntegerField()

    def __str__(self):
        return f"Cash Flow Projection {self.date}"

class ScenarioTest(models.Model):
    TYPE_CHOICES = [
        ('stress', 'Stress'),
        ('sensitivity', 'Sensitivity'),
        ('monte_carlo', 'Monte Carlo'),
    ]

    IMPACT_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=15, choices=TYPE_CHOICES)
    parameters = JSONField()
    revenue = models.FloatField()
    expenses = models.FloatField()
    net_income = models.FloatField()
    cash_flow = models.FloatField()
    impact_severity = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    probability = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Scenario Test: {self.name}"

class RiskAssessment(models.Model):
    CATEGORY_CHOICES = [
        ('liquidity', 'Liquidity'),
        ('credit', 'Credit'),
        ('market', 'Market'),
        ('operational', 'Operational'),
        ('regulatory', 'Regulatory'),
    ]

    STATUS_CHOICES = [
        ('identified', 'Identified'),
        ('monitoring', 'Monitoring'),
        ('mitigating', 'Mitigating'),
        ('resolved', 'Resolved'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    risk_name = models.CharField(max_length=200)
    description = models.TextField()
    probability = models.IntegerField()
    impact = models.IntegerField()
    risk_score = models.IntegerField()
    current_mitigation = JSONField()
    recommended_actions = JSONField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)
    last_reviewed = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Risk Assessment: {self.risk_name}"

class PerformanceDriver(models.Model):
    CATEGORY_CHOICES = [
        ('revenue', 'Revenue'),
        ('cost', 'Cost'),
        ('efficiency', 'Efficiency'),
        ('growth', 'Growth'),
    ]

    TREND_CHOICES = [
        ('improving', 'Improving'),
        ('stable', 'Stable'),
        ('declining', 'Declining'),
    ]

    IMPACT_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    current_value = models.FloatField()
    target_value = models.FloatField()
    unit = models.CharField(max_length=20)
    trend = models.CharField(max_length=15, choices=TREND_CHOICES)
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    linked_budget_items = JSONField()
    kpi_history = JSONField()

    def __str__(self):
        return f"Performance Driver: {self.name}"

class AdvisoryInsight(models.Model):
    TYPE_CHOICES = [
        ('recommendation', 'Recommendation'),
        ('alert', 'Alert'),
        ('opportunity', 'Opportunity'),
        ('risk', 'Risk'),
    ]

    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    CATEGORY_CHOICES = [
        ('investment', 'Investment'),
        ('cost_optimization', 'Cost Optimization'),
        ('revenue_growth', 'Revenue Growth'),
        ('risk_management', 'Risk Management'),
    ]

    STATUS_CHOICES = [
        ('new', 'New'),
        ('reviewed', 'Reviewed'),
        ('implemented', 'Implemented'),
        ('dismissed', 'Dismissed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=15, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    estimated_impact = models.FloatField()
    timeframe = models.CharField(max_length=50)
    confidence = models.IntegerField()
    action_items = JSONField()
    related_metrics = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Advisory Insight: {self.title}"

class BudgetAssumption(models.Model):
    IMPACT_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=100)
    assumption = models.CharField(max_length=200)
    value = models.FloatField()
    unit = models.CharField(max_length=20)
    confidence = models.IntegerField()
    source = models.CharField(max_length=200)
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    last_validated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Budget Assumption: {self.assumption}"

class LiquidityMetric(models.Model):
    STATUS_CHOICES = [
        ('healthy', 'Healthy'),
        ('warning', 'Warning'),
        ('critical', 'Critical'),
    ]

    TREND_CHOICES = [
        ('improving', 'Improving'),
        ('stable', 'Stable'),
        ('declining', 'Declining'),
    ]

    metric = models.CharField(max_length=100)
    current = models.FloatField()
    target = models.FloatField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    trend = models.CharField(max_length=15, choices=TREND_CHOICES)

    def __str__(self):
        return f"Liquidity Metric: {self.metric}"
