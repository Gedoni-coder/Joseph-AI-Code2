from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class TypeEnum(str, Enum):
    COGS = "COGS"
    OPERATING = "Operating"

class VariabilityEnum(str, Enum):
    FIXED = "Fixed"
    VARIABLE = "Variable"
    SEMI_VARIABLE = "Semi-Variable"

class TrendEnum(str, Enum):
    UP = "up"
    DOWN = "down"
    STABLE = "stable"

class ScenarioEnum(str, Enum):
    BEST_CASE = "Best Case"
    BASE_CASE = "Base Case"
    WORST_CASE = "Worst Case"

class CustomerProfileBase(BaseModel):
    segment: str
    demand_assumption: int
    growth_rate: float
    retention: int
    avg_order_value: float
    seasonality: int

class CustomerProfileCreate(CustomerProfileBase):
    pass

class CustomerProfile(CustomerProfileBase):
    id: int

    class Config:
        from_attributes = True

class RevenueProjectionBase(BaseModel):
    period: str
    projected: float
    conservative: float
    optimistic: float
    actual_to_date: Optional[float] = None
    confidence: int

class RevenueProjectionCreate(RevenueProjectionBase):
    pass

class RevenueProjection(RevenueProjectionBase):
    id: int

    class Config:
        from_attributes = True

class CostStructureBase(BaseModel):
    category: str
    type: TypeEnum
    amount: float
    percentage: float
    variability: VariabilityEnum
    trend: TrendEnum

class CostStructureCreate(CostStructureBase):
    pass

class CostStructure(CostStructureBase):
    id: int

    class Config:
        from_attributes = True

class CashFlowForecastBase(BaseModel):
    month: str
    cash_inflow: float
    cash_outflow: float
    net_cash_flow: float
    cumulative_cash: float
    working_capital: float

class CashFlowForecastCreate(CashFlowForecastBase):
    pass

class CashFlowForecast(CashFlowForecastBase):
    id: int

    class Config:
        from_attributes = True

class KPIBase(BaseModel):
    name: str
    current: float
    target: float
    unit: str
    trend: TrendEnum
    category: str
    frequency: str

class KPICreate(KPIBase):
    pass

class KPI(KPIBase):
    id: int

    class Config:
        from_attributes = True

class ScenarioPlanningBase(BaseModel):
    scenario: ScenarioEnum
    revenue: float
    costs: float
    profit: float
    probability: float
    key_assumptions: dict

class ScenarioPlanningCreate(ScenarioPlanningBase):
    pass

class ScenarioPlanning(ScenarioPlanningBase):
    id: int

    class Config:
        from_attributes = True
