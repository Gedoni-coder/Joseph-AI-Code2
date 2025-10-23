from rest_framework import serializers
from .models import CustomerProfile, RevenueProjection, CostStructure, CashFlowForecast, KPI, ScenarioPlanning, Document

class DocumentSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ['id', 'name', 'file', 'file_url', 'file_type', 'file_size', 'uploaded_at', 'description']
        read_only_fields = ['id', 'uploaded_at']

    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None

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
