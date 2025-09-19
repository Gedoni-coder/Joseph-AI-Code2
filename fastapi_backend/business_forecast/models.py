from tortoise import fields, models

class CustomerProfile(models.Model):
    id = fields.IntField(pk=True)
    segment = fields.CharField(max_length=100)
    demand_assumption = fields.IntField()
    growth_rate = fields.FloatField()
    retention = fields.IntField()
    avg_order_value = fields.FloatField()
    seasonality = fields.IntField()

class RevenueProjection(models.Model):
    id = fields.IntField(pk=True)
    period = fields.CharField(max_length=50)
    projected = fields.FloatField()
    conservative = fields.FloatField()
    optimistic = fields.FloatField()
    actual_to_date = fields.FloatField(null=True)
    confidence = fields.IntField()

class CostStructure(models.Model):
    id = fields.IntField(pk=True)
    COGS = "COGS"
    OPERATING = "Operating"
    TYPE_CHOICES = [COGS, OPERATING]

    FIXED = "Fixed"
    VARIABLE = "Variable"
    SEMI_VARIABLE = "Semi-Variable"
    VARIABILITY_CHOICES = [FIXED, VARIABLE, SEMI_VARIABLE]

    UP = "up"
    DOWN = "down"
    STABLE = "stable"
    TREND_CHOICES = [UP, DOWN, STABLE]

    category = fields.CharField(max_length=100)
    type = fields.CharEnumField(str, choices=TYPE_CHOICES)
    amount = fields.FloatField()
    percentage = fields.FloatField()
    variability = fields.CharEnumField(str, choices=VARIABILITY_CHOICES)
    trend = fields.CharEnumField(str, choices=TREND_CHOICES)

class CashFlowForecast(models.Model):
    id = fields.IntField(pk=True)
    month = fields.CharField(max_length=50)
    cash_inflow = fields.FloatField()
    cash_outflow = fields.FloatField()
    net_cash_flow = fields.FloatField()
    cumulative_cash = fields.FloatField()
    working_capital = fields.FloatField()

class KPI(models.Model):
    id = fields.IntField(pk=True)
    UP = "up"
    DOWN = "down"
    STABLE = "stable"
    TREND_CHOICES = [UP, DOWN, STABLE]

    name = fields.CharField(max_length=100)
    current = fields.FloatField()
    target = fields.FloatField()
    unit = fields.CharField(max_length=20)
    trend = fields.CharEnumField(str, choices=TREND_CHOICES)
    category = fields.CharField(max_length=100)
    frequency = fields.CharField(max_length=50)

class ScenarioPlanning(models.Model):
    id = fields.IntField(pk=True)
    BEST_CASE = "Best Case"
    BASE_CASE = "Base Case"
    WORST_CASE = "Worst Case"
    SCENARIO_CHOICES = [BEST_CASE, BASE_CASE, WORST_CASE]

    scenario = fields.CharEnumField(str, choices=SCENARIO_CHOICES)
    revenue = fields.FloatField()
    costs = fields.FloatField()
    profit = fields.FloatField()
    probability = fields.FloatField()
    key_assumptions = fields.JSONField()
