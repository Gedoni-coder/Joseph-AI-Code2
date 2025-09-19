from rest_framework import viewsets
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
from .serializers import (
    InventoryItemSerializer,
    StockMovementSerializer,
    DemandForecastSerializer,
    InventoryValuationSerializer,
    DeadStockSerializer,
    LocationSerializer,
    InventoryAuditSerializer,
    TurnoverMetricSerializer,
    SupplierSerializer,
    ProcurementOrderSerializer,
    ProductionPlanSerializer,
    WarehouseOperationSerializer,
    LogisticsMetricSerializer,
    MarketVolatilitySerializer,
    RegulatoryComplianceSerializer,
    DisruptionRiskSerializer,
    SustainabilityMetricSerializer,
)

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.all()
    serializer_class = StockMovementSerializer

class DemandForecastViewSet(viewsets.ModelViewSet):
    queryset = DemandForecast.objects.all()
    serializer_class = DemandForecastSerializer

class InventoryValuationViewSet(viewsets.ModelViewSet):
    queryset = InventoryValuation.objects.all()
    serializer_class = InventoryValuationSerializer

class DeadStockViewSet(viewsets.ModelViewSet):
    queryset = DeadStock.objects.all()
    serializer_class = DeadStockSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class InventoryAuditViewSet(viewsets.ModelViewSet):
    queryset = InventoryAudit.objects.all()
    serializer_class = InventoryAuditSerializer

class TurnoverMetricViewSet(viewsets.ModelViewSet):
    queryset = TurnoverMetric.objects.all()
    serializer_class = TurnoverMetricSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class ProcurementOrderViewSet(viewsets.ModelViewSet):
    queryset = ProcurementOrder.objects.all()
    serializer_class = ProcurementOrderSerializer

class ProductionPlanViewSet(viewsets.ModelViewSet):
    queryset = ProductionPlan.objects.all()
    serializer_class = ProductionPlanSerializer

class WarehouseOperationViewSet(viewsets.ModelViewSet):
    queryset = WarehouseOperation.objects.all()
    serializer_class = WarehouseOperationSerializer

class LogisticsMetricViewSet(viewsets.ModelViewSet):
    queryset = LogisticsMetric.objects.all()
    serializer_class = LogisticsMetricSerializer

class MarketVolatilityViewSet(viewsets.ModelViewSet):
    queryset = MarketVolatility.objects.all()
    serializer_class = MarketVolatilitySerializer

class RegulatoryComplianceViewSet(viewsets.ModelViewSet):
    queryset = RegulatoryCompliance.objects.all()
    serializer_class = RegulatoryComplianceSerializer

class DisruptionRiskViewSet(viewsets.ModelViewSet):
    queryset = DisruptionRisk.objects.all()
    serializer_class = DisruptionRiskSerializer

class SustainabilityMetricViewSet(viewsets.ModelViewSet):
    queryset = SustainabilityMetric.objects.all()
    serializer_class = SustainabilityMetricSerializer
