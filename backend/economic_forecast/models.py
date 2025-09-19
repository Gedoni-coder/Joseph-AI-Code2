from django.db import models

class EconomicMetric(models.Model):
    LOCAL = "local"
    NATIONAL = "national"
    STATE = "state"
    INTERNATIONAL = "international"
    CONTEXT_CHOICES = [
        (LOCAL, "Local"),
        (NATIONAL, "National"),
        (STATE, "State"),
        (INTERNATIONAL, "International"),
    ]

    UP = "up"
    DOWN = "down"
    STABLE = "stable"
    TREND_CHOICES = [
        (UP, "up"),
        (DOWN, "down"),
        (STABLE, "stable"),
    ]

    context = models.CharField(max_length=20, choices=CONTEXT_CHOICES)
    name = models.CharField(max_length=100)
    value = models.FloatField()
    change = models.FloatField()
    unit = models.CharField(max_length=20)
    trend = models.CharField(max_length=10, choices=TREND_CHOICES)
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.context} - {self.name}"

class EconomicNews(models.Model):
    LOCAL = "local"
    NATIONAL = "national"
    STATE = "state"
    INTERNATIONAL = "international"
    CONTEXT_CHOICES = [
        (LOCAL, "Local"),
        (NATIONAL, "National"),
        (STATE, "State"),
        (INTERNATIONAL, "International"),
    ]

    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    IMPACT_CHOICES = [
        (HIGH, "High"),
        (MEDIUM, "Medium"),
        (LOW, "Low"),
    ]

    context = models.CharField(max_length=20, choices=CONTEXT_CHOICES)
    title = models.CharField(max_length=200)
    summary = models.TextField()
    source = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class EconomicForecast(models.Model):
    LOCAL = "local"
    NATIONAL = "national"
    STATE = "state"
    INTERNATIONAL = "international"
    CONTEXT_CHOICES = [
        (LOCAL, "Local"),
        (NATIONAL, "National"),
        (STATE, "State"),
        (INTERNATIONAL, "International"),
    ]

    context = models.CharField(max_length=20, choices=CONTEXT_CHOICES)
    indicator = models.CharField(max_length=100)
    period = models.CharField(max_length=50)
    forecast = models.FloatField()
    confidence = models.IntegerField()
    range_low = models.FloatField()
    range_high = models.FloatField()

    def __str__(self):
        return f"{self.context} - {self.indicator} Forecast"

class EconomicEvent(models.Model):
    LOCAL = "local"
    NATIONAL = "national"
    STATE = "state"
    INTERNATIONAL = "international"
    CONTEXT_CHOICES = [
        (LOCAL, "Local"),
        (NATIONAL, "National"),
        (STATE, "State"),
        (INTERNATIONAL, "International"),
    ]

    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    IMPACT_CHOICES = [
        (HIGH, "High"),
        (MEDIUM, "Medium"),
        (LOW, "Low"),
    ]

    context = models.CharField(max_length=20, choices=CONTEXT_CHOICES)
    title = models.CharField(max_length=200)
    date = models.DateField()
    description = models.TextField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.title
