from django.contrib import admin
from .models import ExternalPolicy, InternalPolicy, PolicyReport, EconomicIndicator, InternalImpact, StrategyRecommendation

admin.site.register(ExternalPolicy)
admin.site.register(InternalPolicy)
admin.site.register(PolicyReport)
admin.site.register(EconomicIndicator)
admin.site.register(InternalImpact)
admin.site.register(StrategyRecommendation)
