from django.contrib import admin
from .models import BudgetForecast, CashFlowProjection, ScenarioTest, RiskAssessment, PerformanceDriver, AdvisoryInsight, BudgetAssumption, LiquidityMetric

admin.site.register(BudgetForecast)
admin.site.register(CashFlowProjection)
admin.site.register(ScenarioTest)
admin.site.register(RiskAssessment)
admin.site.register(PerformanceDriver)
admin.site.register(AdvisoryInsight)
admin.site.register(BudgetAssumption)
admin.site.register(LiquidityMetric)
