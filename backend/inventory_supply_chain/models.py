from django.db import models
from django.db.models import JSONField

class InventoryItem(models.Model):
    CATEGORY_CHOICES = [
        ("raw_materials", "Raw Materials"),
        ("finished_goods", "Finished Goods"),
        ("work_in_progress", "Work in Progress"),
        ("packaging", "Packaging"),
        ("spare_parts", "Spare Parts"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    unit = models.CharField(max_length=50)
    currentStock = models.IntegerField()
    reorderPoint = models.IntegerField()
    unitCost = models.FloatField()
    supplier = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    lastUpdated = models.DateField()

    def __str__(self):
        return self.name

class StockMovement(models.Model):
    MOVEMENT_TYPE_CHOICES = [
        ("in", "Stock In"),
        ("out", "Stock Out"),
        ("adjustment", "Adjustment"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    item = models.CharField(max_length=255)
    movementType = models.CharField(max_length=20, choices=MOVEMENT_TYPE_CHOICES)
    quantity = models.IntegerField()
    reason = models.TextField()
    date = models.DateField()
    user = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.movementType} - {self.item}"

class DemandForecast(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    item = models.CharField(max_length=255)
    period = models.CharField(max_length=100)
    forecastedDemand = models.IntegerField()
    confidence = models.FloatField()
    lastUpdated = models.DateField()

    def __str__(self):
        return f"Forecast for {self.item} - {self.period}"

class InventoryValuation(models.Model):
    VALUATION_METHOD_CHOICES = [
        ("fifo", "FIFO"),
        ("lifo", "LIFO"),
        ("weighted_average", "Weighted Average"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    item = models.CharField(max_length=255)
    valuationMethod = models.CharField(max_length=20, choices=VALUATION_METHOD_CHOICES)
    value = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return f"Valuation for {self.item}"

class DeadStock(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    item = models.CharField(max_length=255)
    quantity = models.IntegerField()
    reason = models.TextField()
    dateIdentified = models.DateField()
    disposalPlan = models.TextField()

    def __str__(self):
        return f"Dead Stock - {self.item}"

class Location(models.Model):
    TYPE_CHOICES = [
        ("warehouse", "Warehouse"),
        ("store", "Store"),
        ("distribution_center", "Distribution Center"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    address = models.TextField()
    capacity = models.IntegerField()

    def __str__(self):
        return self.name

class InventoryAudit(models.Model):
    STATUS_CHOICES = [
        ("completed", "Completed"),
        ("in_progress", "In Progress"),
        ("scheduled", "Scheduled"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    location = models.CharField(max_length=255)
    auditDate = models.DateField()
    auditor = models.CharField(max_length=255)
    findings = JSONField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Audit - {self.location}"

class TurnoverMetric(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    item = models.CharField(max_length=255)
    period = models.CharField(max_length=100)
    turnoverRate = models.FloatField()
    lastCalculated = models.DateField()

    def __str__(self):
        return f"Turnover - {self.item}"

class Supplier(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    contactInfo = JSONField()
    rating = models.FloatField()
    leadTime = models.IntegerField()  # in days
    terms = models.TextField()

    def __str__(self):
        return self.name

class ProcurementOrder(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    supplier = models.CharField(max_length=255)
    items = JSONField()
    orderDate = models.DateField()
    expectedDelivery = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Order {self.id}"

class ProductionPlan(models.Model):
    STATUS_CHOICES = [
        ("planned", "Planned"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    item = models.CharField(max_length=255)
    quantity = models.IntegerField()
    startDate = models.DateField()
    endDate = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Production Plan - {self.item}"

class WarehouseOperation(models.Model):
    OPERATION_TYPE_CHOICES = [
        ("receiving", "Receiving"),
        ("picking", "Picking"),
        ("packing", "Packing"),
        ("shipping", "Shipping"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    operationType = models.CharField(max_length=20, choices=OPERATION_TYPE_CHOICES)
    item = models.CharField(max_length=255)
    quantity = models.IntegerField()
    location = models.CharField(max_length=255)
    date = models.DateField()
    operator = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.operationType} - {self.item}"

class LogisticsMetric(models.Model):
    METRIC_TYPE_CHOICES = [
        ("on_time_delivery", "On-Time Delivery"),
        ("order_accuracy", "Order Accuracy"),
        ("inventory_accuracy", "Inventory Accuracy"),
        ("shipping_cost", "Shipping Cost"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    metricType = models.CharField(max_length=20, choices=METRIC_TYPE_CHOICES)
    value = models.FloatField()
    period = models.CharField(max_length=100)
    location = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.metricType} - {self.period}"

class MarketVolatility(models.Model):
    IMPACT_CHOICES = [
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    market = models.CharField(max_length=255)
    volatilityIndex = models.FloatField()
    date = models.DateField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)

    def __str__(self):
        return f"Volatility - {self.market}"

class RegulatoryCompliance(models.Model):
    COMPLIANCE_STATUS_CHOICES = [
        ("compliant", "Compliant"),
        ("non_compliant", "Non-Compliant"),
        ("pending_review", "Pending Review"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    regulation = models.CharField(max_length=255)
    complianceStatus = models.CharField(max_length=20, choices=COMPLIANCE_STATUS_CHOICES)
    lastChecked = models.DateField()
    notes = models.TextField()

    def __str__(self):
        return f"Compliance - {self.regulation}"

class DisruptionRisk(models.Model):
    RISK_TYPE_CHOICES = [
        ("supply_chain", "Supply Chain"),
        ("logistics", "Logistics"),
        ("market", "Market"),
        ("regulatory", "Regulatory"),
        ("natural_disaster", "Natural Disaster"),
    ]
    IMPACT_CHOICES = [
        ("critical", "Critical"),
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    riskType = models.CharField(max_length=20, choices=RISK_TYPE_CHOICES)
    description = models.TextField()
    probability = models.FloatField()
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES)
    mitigation = models.TextField()

    def __str__(self):
        return f"Risk - {self.riskType}"

class SustainabilityMetric(models.Model):
    METRIC_TYPE_CHOICES = [
        ("carbon_footprint", "Carbon Footprint"),
        ("waste_reduction", "Waste Reduction"),
        ("energy_efficiency", "Energy Efficiency"),
        ("water_usage", "Water Usage"),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    metricType = models.CharField(max_length=20, choices=METRIC_TYPE_CHOICES)
    value = models.FloatField()
    period = models.CharField(max_length=100)
    target = models.FloatField()

    def __str__(self):
        return f"{self.metricType} - {self.period}"
