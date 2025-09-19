from django.contrib import admin
from .models import RevenueStream, RevenueScenario, ChurnReason, ChurnAnalysis, UpsellOpportunity, RevenueMetric, DiscountAnalysis, ChannelPerformance

admin.site.register(RevenueStream)
admin.site.register(RevenueScenario)
admin.site.register(ChurnReason)
admin.site.register(ChurnAnalysis)
admin.site.register(UpsellOpportunity)
admin.site.register(RevenueMetric)
admin.site.register(DiscountAnalysis)
admin.site.register(ChannelPerformance)
