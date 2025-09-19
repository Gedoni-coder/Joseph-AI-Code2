from django.contrib import admin
from .models import CustomerProfile, RevenueProjection, CostStructure, CashFlowForecast, KPI, ScenarioPlanning

admin.site.register(CustomerProfile)
admin.site.register(RevenueProjection)
admin.site.register(CostStructure)
admin.site.register(CashFlowForecast)
admin.site.register(KPI)
admin.site.register(ScenarioPlanning)
