from rest_framework import serializers
from .models import (
    InventoryItem,
    StockMovement,
    DemandForecast,
    InventoryValuation,
    DeadStock,
    Location,
    InventoryAudit,
    TurnoverMetric,
    Supplier,
    ProcurementOrder,
    ProductionPlan,
    WarehouseOperation,
    LogisticsMetric,
    MarketVolatility,
    RegulatoryCompliance,
    DisruptionRisk,
    SustainabilityMetric,
)

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'

class StockMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMovement
        fields = '__all__'

class DemandForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemandForecast
        fields = '__all__'

class InventoryValuationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryValuation
        fields = '__all__'

class DeadStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeadStock
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class InventoryAuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryAudit
        fields = '__all__'

class TurnoverMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = TurnoverMetric
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ProcurementOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcurementOrder
        fields = '__all__'

class ProductionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionPlan
        fields = '__all__'

class WarehouseOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseOperation
        fields = '__all__'

class LogisticsMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogisticsMetric
        fields = '__all__'

class MarketVolatilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketVolatility
        fields = '__all__'

class RegulatoryComplianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegulatoryCompliance
        fields = '__all__'

class DisruptionRiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisruptionRisk
        fields = '__all__'

class SustainabilityMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = SustainabilityMetric
        fields = '__all__'
