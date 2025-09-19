from rest_framework import serializers
from .models import CustomerProfile, RevenueProjection, CostStructure, CashFlowForecast, KPI, ScenarioPlanning

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'

class RevenueProjectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueProjection
        fields = '__all__'

class CostStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CostStructure
        fields = '__all__'

class CashFlowForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashFlowForecast
        fields = '__all__'

class KPISerializer(serializers.ModelSerializer):
    class Meta:
        model = KPI
        fields = '__all__'

class ScenarioPlanningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScenarioPlanning
        fields = '__all__'
