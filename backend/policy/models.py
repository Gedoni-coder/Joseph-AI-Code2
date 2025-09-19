from django.db import models
from django.db.models import JSONField

class ExternalPolicy(models.Model):
    TYPE_CHOICES = [
        ("government", "Government"),
        ("international", "International"),
        ("trade", "Trade"),
        ("regulatory", "Regulatory"),
    ]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("pending", "Pending"),
        ("draft", "Draft"),
        ("expired", "Expired"),
    ]
    IMPACT_CHOICES = [
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    effectiveDate = models.DateField()
    jurisdiction = models.CharField(max_length=255)
    summary = models.TextField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    businessAreas = JSONField()
    complianceDeadline = models.DateField(null=True, blank=True)
    lastUpdated = models.DateField()

    def __str__(self):
        return self.title

class InternalPolicy(models.Model):
    TYPE_CHOICES = [
        ("compliance", "Compliance"),
        ("operational", "Operational"),
        ("hr", "HR"),
        ("financial", "Financial"),
        ("environmental", "Environmental"),
    ]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("under_review", "Under Review"),
        ("draft", "Draft"),
        ("archived", "Archived"),
    ]
    IMPLEMENTATION_STATUS_CHOICES = [
        ("fully_implemented", "Fully Implemented"),
        ("partial", "Partial"),
        ("planning", "Planning"),
        ("not_started", "Not Started"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    version = models.CharField(max_length=50)
    approvedBy = models.CharField(max_length=255)
    lastReviewed = models.DateField()
    nextReview = models.DateField()
    alignmentScore = models.FloatField()
    relatedExternalPolicies = JSONField()
    implementationStatus = models.CharField(max_length=20, choices=IMPLEMENTATION_STATUS_CHOICES)

    def __str__(self):
        return self.title

class PolicyReport(models.Model):
    TYPE_CHOICES = [
        ("alignment", "Alignment"),
        ("compliance", "Compliance"),
        ("gap_analysis", "Gap Analysis"),
        ("impact_assessment", "Impact Assessment"),
    ]
    SEVERITY_CHOICES = [
        ("critical", "Critical"),
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]
    FINDING_STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    generatedDate = models.DateField()
    period = models.CharField(max_length=100)
    summary = models.TextField()
    findings = JSONField()
    complianceScore = models.FloatField()
    recommendations = JSONField()

    def __str__(self):
        return self.title

class EconomicIndicator(models.Model):
    CATEGORY_CHOICES = [
        ("macro", "Macro"),
        ("market", "Market"),
        ("industry", "Industry"),
        ("financial", "Financial"),
    ]
    TREND_CHOICES = [
        ("up", "Up"),
        ("down", "Down"),
        ("stable", "Stable"),
    ]
    IMPACT_CHOICES = [
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    value = models.FloatField()
    unit = models.CharField(max_length=50)
    previousValue = models.FloatField()
    trend = models.CharField(max_length=10, choices=TREND_CHOICES)
    changePercent = models.FloatField()
    lastUpdated = models.DateField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    forecast = JSONField()

    def __str__(self):
        return self.name

class InternalImpact(models.Model):
    IMPACT_TYPE_CHOICES = [
        ("revenue", "Revenue"),
        ("costs", "Costs"),
        ("operations", "Operations"),
        ("strategy", "Strategy"),
    ]
    SEVERITY_CHOICES = [
        ("critical", "Critical"),
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]
    STATUS_CHOICES = [
        ("identified", "Identified"),
        ("analyzing", "Analyzing"),
        ("mitigating", "Mitigating"),
        ("monitored", "Monitored"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    economicIndicator = models.CharField(max_length=255)
    businessArea = models.CharField(max_length=255)
    impactType = models.CharField(max_length=20, choices=IMPACT_TYPE_CHOICES)
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    description = models.TextField()
    quantifiedImpact = JSONField()
    mitigationActions = JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    lastAssessed = models.DateField()

    def __str__(self):
        return f"{self.businessArea} Impact"

class StrategyRecommendation(models.Model):
    CATEGORY_CHOICES = [
        ("policy_adaptation", "Policy Adaptation"),
        ("economic_mitigation", "Economic Mitigation"),
        ("opportunity_leverage", "Opportunity Leverage"),
        ("risk_management", "Risk Management"),
    ]
    PRIORITY_CHOICES = [
        ("critical", "Critical"),
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]
    STATUS_CHOICES = [
        ("proposed", "Proposed"),
        ("approved", "Approved"),
        ("in_progress", "In Progress"),
        ("implemented", "Implemented"),
        ("on_hold", "On Hold"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    description = models.TextField()
    expectedOutcome = models.TextField()
    timeline = models.CharField(max_length=100)
    resources = JSONField()
    success_metrics = JSONField()
    dependencies = JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    assignedTo = models.CharField(max_length=255)
    estimatedCost = models.FloatField()
    expectedROI = models.FloatField()

    def __str__(self):
        return self.title
