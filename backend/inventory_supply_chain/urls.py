from rest_framework.routers import DefaultRouter
from .views import (
    InventoryItemViewSet,
    StockMovementViewSet,
    DemandForecastViewSet,
    InventoryValuationViewSet,
    DeadStockViewSet,
    LocationViewSet,
    InventoryAuditViewSet,
    TurnoverMetricViewSet,
    SupplierViewSet,
    ProcurementOrderViewSet,
    ProductionPlanViewSet,
    WarehouseOperationViewSet,
    LogisticsMetricViewSet,
    MarketVolatilityViewSet,
    RegulatoryComplianceViewSet,
    DisruptionRiskViewSet,
    SustainabilityMetricViewSet,
)

router = DefaultRouter()
router.register(r'inventory-items', InventoryItemViewSet)
router.register(r'stock-movements', StockMovementViewSet)
router.register(r'demand-forecasts', DemandForecastViewSet)
router.register(r'inventory-valuations', InventoryValuationViewSet)
router.register(r'dead-stocks', DeadStockViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'inventory-audits', InventoryAuditViewSet)
router.register(r'turnover-metrics', TurnoverMetricViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'procurement-orders', ProcurementOrderViewSet)
router.register(r'production-plans', ProductionPlanViewSet)
router.register(r'warehouse-operations', WarehouseOperationViewSet)
router.register(r'logistics-metrics', LogisticsMetricViewSet)
router.register(r'market-volatilities', MarketVolatilityViewSet)
router.register(r'regulatory-compliances', RegulatoryComplianceViewSet)
router.register(r'disruption-risks', DisruptionRiskViewSet)
router.register(r'sustainability-metrics', SustainabilityMetricViewSet)

urlpatterns = router.urls
