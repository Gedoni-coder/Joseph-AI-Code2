from rest_framework import serializers
from .models import (
    BudgetForecast, CashFlowProjection, ScenarioTest, RiskAssessment,
    PerformanceDriver, AdvisoryInsight, BudgetAssumption, LiquidityMetric
)

class BudgetForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetForecast
        fields = '__all__'

class CashFlowProjectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashFlowProjection
        fields = '__all__'

class ScenarioTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScenarioTest
        fields = '__all__'

class RiskAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskAssessment
        fields = '__all__'

class PerformanceDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceDriver
        fields = '__all__'

class AdvisoryInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvisoryInsight
        fields = '__all__'

class BudgetAssumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetAssumption
        fields = '__all__'

class LiquidityMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidityMetric
        fields = '__all__'
