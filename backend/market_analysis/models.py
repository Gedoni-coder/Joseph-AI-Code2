from django.db import models

class MarketSegment(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    market_size = models.FloatField()
    growth_rate = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Competitor(models.Model):
    name = models.CharField(max_length=100)
    market_segment = models.ForeignKey(MarketSegment, related_name='competitors', on_delete=models.CASCADE)
    market_share = models.FloatField()
    strengths = models.TextField(blank=True)
    weaknesses = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class MarketTrend(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    impact = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
