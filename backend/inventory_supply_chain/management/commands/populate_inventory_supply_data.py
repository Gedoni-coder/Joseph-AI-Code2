from django.core.management.base import BaseCommand
from inventory_supply_chain.models import (
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

class Command(BaseCommand):
    help = 'Populate database with initial inventory and supply chain data'

    def handle(self, *args, **options):
        # Inventory Items
        InventoryItem.objects.all().delete()
        InventoryItem.objects.create(
            id="item-001",
            name="Steel Rods",
            description="High quality steel rods for construction",
            category="raw_materials",
            unit="kg",
            currentStock=10000,
            reorderPoint=2000,
            unitCost=2.5,
            supplier="Steel Supplier Inc.",
            location="Warehouse A",
            lastUpdated="2024-01-10"
        )
        InventoryItem.objects.create(
            id="item-002",
            name="Packaging Boxes",
            description="Cardboard boxes for packaging finished goods",
            category="packaging",
            unit="pieces",
            currentStock=5000,
            reorderPoint=1000,
            unitCost=0.5,
            supplier="Packaging Co.",
            location="Warehouse B",
            lastUpdated="2024-01-12"
        )

        # Stock Movements
        StockMovement.objects.all().delete()
        StockMovement.objects.create(
            id="move-001",
            item="Steel Rods",
            movementType="in",
            quantity=2000,
            reason="New shipment received",
            date="2024-01-15",
            user="warehouse_manager"
        )
        StockMovement.objects.create(
            id="move-002",
            item="Packaging Boxes",
            movementType="out",
            quantity=500,
            reason="Used for order #1234",
            date="2024-01-16",
            user="warehouse_operator"
        )

        # Demand Forecasts
        DemandForecast.objects.all().delete()
        DemandForecast.objects.create(
            id="forecast-001",
            item="Steel Rods",
            period="Q1 2024",
            forecastedDemand=12000,
            confidence=0.85,
            lastUpdated="2024-01-10"
        )

        # Inventory Valuations
        InventoryValuation.objects.all().delete()
        InventoryValuation.objects.create(
            id="valuation-001",
            item="Steel Rods",
            valuationMethod="fifo",
            value=25000.0,
            date="2024-01-15"
        )

        # Dead Stock
        DeadStock.objects.all().delete()
        DeadStock.objects.create(
            id="deadstock-001",
            item="Old Packaging Boxes",
            quantity=100,
            reason="Damaged during transport",
            dateIdentified="2024-01-05",
            disposalPlan="Recycle through local waste management"
        )

        # Locations
        Location.objects.all().delete()
        Location.objects.create(
            id="loc-001",
            name="Warehouse A",
            type="warehouse",
            address="123 Industrial Park",
            capacity=50000
        )
        Location.objects.create(
            id="loc-002",
            name="Storefront 1",
            type="store",
            address="456 Main Street",
            capacity=2000
        )

        # Inventory Audits
        InventoryAudit.objects.all().delete()
        InventoryAudit.objects.create(
            id="audit-001",
            location="Warehouse A",
            auditDate="2024-01-20",
            auditor="John Doe",
            findings={"discrepancies": 2, "notes": "Minor stock count differences"},
            status="completed"
        )

        # Turnover Metrics
        TurnoverMetric.objects.all().delete()
        TurnoverMetric.objects.create(
            id="turnover-001",
            item="Steel Rods",
            period="2023",
            turnoverRate=4.5,
            lastCalculated="2024-01-01"
        )

        # Suppliers
        Supplier.objects.all().delete()
        Supplier.objects.create(
            id="supplier-001",
            name="Steel Supplier Inc.",
            contactInfo={"phone": "123-456-7890", "email": "contact@steelsupplier.com"},
            rating=4.7,
            leadTime=7,
            terms="Net 30"
        )

        # Procurement Orders
        ProcurementOrder.objects.all().delete()
        ProcurementOrder.objects.create(
            id="order-001",
            supplier="Steel Supplier Inc.",
            items=[{"item": "Steel Rods", "quantity": 5000}],
            orderDate="2024-01-10",
            expectedDelivery="2024-01-17",
            status="pending"
        )

        # Production Plans
        ProductionPlan.objects.all().delete()
        ProductionPlan.objects.create(
            id="plan-001",
            item="Steel Rods",
            quantity=15000,
            startDate="2024-02-01",
            endDate="2024-03-01",
            status="planned"
        )

        # Warehouse Operations
        WarehouseOperation.objects.all().delete()
        WarehouseOperation.objects.create(
            id="op-001",
            operationType="receiving",
            item="Steel Rods",
            quantity=2000,
            location="Warehouse A",
            date="2024-01-15",
            operator="warehouse_manager"
        )

        # Logistics Metrics
        LogisticsMetric.objects.all().delete()
        LogisticsMetric.objects.create(
            id="metric-001",
            metricType="on_time_delivery",
            value=98.5,
            period="2023",
            location="Warehouse A"
        )

        # Market Volatilities
        MarketVolatility.objects.all().delete()
        MarketVolatility.objects.create(
            id="volatility-001",
            market="Steel Market",
            volatilityIndex=1.2,
            date="2024-01-10",
            impact="medium"
        )

        # Regulatory Compliances
        RegulatoryCompliance.objects.all().delete()
        RegulatoryCompliance.objects.create(
            id="compliance-001",
            regulation="OSHA Safety Standards",
            complianceStatus="compliant",
            lastChecked="2024-01-05",
            notes="All safety protocols followed"
        )

        # Disruption Risks
        DisruptionRisk.objects.all().delete()
        DisruptionRisk.objects.create(
            id="risk-001",
            riskType="supply_chain",
            description="Potential delays due to port strikes",
            probability=0.3,
            impact="high",
            mitigation="Develop alternative supplier relationships"
        )

        # Sustainability Metrics
        SustainabilityMetric.objects.all().delete()
        SustainabilityMetric.objects.create(
            id="metric-001",
            metricType="carbon_footprint",
            value=1500.0,
            period="2023",
            target=1200.0
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with inventory and supply chain data'))
