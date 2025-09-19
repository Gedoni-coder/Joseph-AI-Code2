from fastapi import APIRouter, HTTPException
from typing import List
from .models import CustomerProfile, RevenueProjection, CostStructure, CashFlowForecast, KPI, ScenarioPlanning
from .schemas import (
    CustomerProfile, CustomerProfileCreate,
    RevenueProjection, RevenueProjectionCreate,
    CostStructure, CostStructureCreate,
    CashFlowForecast, CashFlowForecastCreate,
    KPI, KPICreate,
    ScenarioPlanning, ScenarioPlanningCreate,
)

router = APIRouter()

# CustomerProfile endpoints
@router.get("/customer-profiles/", response_model=List[CustomerProfile])
async def get_customer_profiles():
    return await CustomerProfile.all()

@router.post("/customer-profiles/", response_model=CustomerProfile)
async def create_customer_profile(profile: CustomerProfileCreate):
    profile_obj = await CustomerProfile.create(**profile.dict())
    return profile_obj

@router.get("/customer-profiles/{profile_id}", response_model=CustomerProfile)
async def get_customer_profile(profile_id: int):
    profile = await CustomerProfile.get_or_none(id=profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="CustomerProfile not found")
    return profile

@router.put("/customer-profiles/{profile_id}", response_model=CustomerProfile)
async def update_customer_profile(profile_id: int, profile: CustomerProfileCreate):
    profile_obj = await CustomerProfile.get_or_none(id=profile_id)
    if not profile_obj:
        raise HTTPException(status_code=404, detail="CustomerProfile not found")
    await profile_obj.update_from_dict(profile.dict()).save()
    return profile_obj

@router.delete("/customer-profiles/{profile_id}")
async def delete_customer_profile(profile_id: int):
    profile = await CustomerProfile.get_or_none(id=profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="CustomerProfile not found")
    await profile.delete()
    return {"message": "CustomerProfile deleted"}

# RevenueProjection endpoints
@router.get("/revenue-projections/", response_model=List[RevenueProjection])
async def get_revenue_projections():
    return await RevenueProjection.all()

@router.post("/revenue-projections/", response_model=RevenueProjection)
async def create_revenue_projection(projection: RevenueProjectionCreate):
    projection_obj = await RevenueProjection.create(**projection.dict())
    return projection_obj

@router.get("/revenue-projections/{projection_id}", response_model=RevenueProjection)
async def get_revenue_projection(projection_id: int):
    projection = await RevenueProjection.get_or_none(id=projection_id)
    if not projection:
        raise HTTPException(status_code=404, detail="RevenueProjection not found")
    return projection

@router.put("/revenue-projections/{projection_id}", response_model=RevenueProjection)
async def update_revenue_projection(projection_id: int, projection: RevenueProjectionCreate):
    projection_obj = await RevenueProjection.get_or_none(id=projection_id)
    if not projection_obj:
        raise HTTPException(status_code=404, detail="RevenueProjection not found")
    await projection_obj.update_from_dict(projection.dict()).save()
    return projection_obj

@router.delete("/revenue-projections/{projection_id}")
async def delete_revenue_projection(projection_id: int):
    projection = await RevenueProjection.get_or_none(id=projection_id)
    if not projection:
        raise HTTPException(status_code=404, detail="RevenueProjection not found")
    await projection.delete()
    return {"message": "RevenueProjection deleted"}

# CostStructure endpoints
@router.get("/cost-structures/", response_model=List[CostStructure])
async def get_cost_structures():
    return await CostStructure.all()

@router.post("/cost-structures/", response_model=CostStructure)
async def create_cost_structure(structure: CostStructureCreate):
    structure_obj = await CostStructure.create(**structure.dict())
    return structure_obj

@router.get("/cost-structures/{structure_id}", response_model=CostStructure)
async def get_cost_structure(structure_id: int):
    structure = await CostStructure.get_or_none(id=structure_id)
    if not structure:
        raise HTTPException(status_code=404, detail="CostStructure not found")
    return structure

@router.put("/cost-structures/{structure_id}", response_model=CostStructure)
async def update_cost_structure(structure_id: int, structure: CostStructureCreate):
    structure_obj = await CostStructure.get_or_none(id=structure_id)
    if not structure_obj:
        raise HTTPException(status_code=404, detail="CostStructure not found")
    await structure_obj.update_from_dict(structure.dict()).save()
    return structure_obj

@router.delete("/cost-structures/{structure_id}")
async def delete_cost_structure(structure_id: int):
    structure = await CostStructure.get_or_none(id=structure_id)
    if not structure:
        raise HTTPException(status_code=404, detail="CostStructure not found")
    await structure.delete()
    return {"message": "CostStructure deleted"}

# CashFlowForecast endpoints
@router.get("/cash-flow-forecasts/", response_model=List[CashFlowForecast])
async def get_cash_flow_forecasts():
    return await CashFlowForecast.all()

@router.post("/cash-flow-forecasts/", response_model=CashFlowForecast)
async def create_cash_flow_forecast(forecast: CashFlowForecastCreate):
    forecast_obj = await CashFlowForecast.create(**forecast.dict())
    return forecast_obj

@router.get("/cash-flow-forecasts/{forecast_id}", response_model=CashFlowForecast)
async def get_cash_flow_forecast(forecast_id: int):
    forecast = await CashFlowForecast.get_or_none(id=forecast_id)
    if not forecast:
        raise HTTPException(status_code=404, detail="CashFlowForecast not found")
    return forecast

@router.put("/cash-flow-forecasts/{forecast_id}", response_model=CashFlowForecast)
async def update_cash_flow_forecast(forecast_id: int, forecast: CashFlowForecastCreate):
    forecast_obj = await CashFlowForecast.get_or_none(id=forecast_id)
    if not forecast_obj:
        raise HTTPException(status_code=404, detail="CashFlowForecast not found")
    await forecast_obj.update_from_dict(forecast.dict()).save()
    return forecast_obj

@router.delete("/cash-flow-forecasts/{forecast_id}")
async def delete_cash_flow_forecast(forecast_id: int):
    forecast = await CashFlowForecast.get_or_none(id=forecast_id)
    if not forecast:
        raise HTTPException(status_code=404, detail="CashFlowForecast not found")
    await forecast.delete()
    return {"message": "CashFlowForecast deleted"}

# KPI endpoints
@router.get("/kpis/", response_model=List[KPI])
async def get_kpis():
    return await KPI.all()

@router.post("/kpis/", response_model=KPI)
async def create_kpi(kpi: KPICreate):
    kpi_obj = await KPI.create(**kpi.dict())
    return kpi_obj

@router.get("/kpis/{kpi_id}", response_model=KPI)
async def get_kpi(kpi_id: int):
    kpi = await KPI.get_or_none(id=kpi_id)
    if not kpi:
        raise HTTPException(status_code=404, detail="KPI not found")
    return kpi

@router.put("/kpis/{kpi_id}", response_model=KPI)
async def update_kpi(kpi_id: int, kpi: KPICreate):
    kpi_obj = await KPI.get_or_none(id=kpi_id)
    if not kpi_obj:
        raise HTTPException(status_code=404, detail="KPI not found")
    await kpi_obj.update_from_dict(kpi.dict()).save()
    return kpi_obj

@router.delete("/kpis/{kpi_id}")
async def delete_kpi(kpi_id: int):
    kpi = await KPI.get_or_none(id=kpi_id)
    if not kpi:
        raise HTTPException(status_code=404, detail="KPI not found")
    await kpi.delete()
    return {"message": "KPI deleted"}

# ScenarioPlanning endpoints
@router.get("/scenario-plannings/", response_model=List[ScenarioPlanning])
async def get_scenario_plannings():
    return await ScenarioPlanning.all()

@router.post("/scenario-plannings/", response_model=ScenarioPlanning)
async def create_scenario_planning(planning: ScenarioPlanningCreate):
    planning_obj = await ScenarioPlanning.create(**planning.dict())
    return planning_obj

@router.get("/scenario-plannings/{planning_id}", response_model=ScenarioPlanning)
async def get_scenario_planning(planning_id: int):
    planning = await ScenarioPlanning.get_or_none(id=planning_id)
    if not planning:
        raise HTTPException(status_code=404, detail="ScenarioPlanning not found")
    return planning

@router.put("/scenario-plannings/{planning_id}", response_model=ScenarioPlanning)
async def update_scenario_planning(planning_id: int, planning: ScenarioPlanningCreate):
    planning_obj = await ScenarioPlanning.get_or_none(id=planning_id)
    if not planning_obj:
        raise HTTPException(status_code=404, detail="ScenarioPlanning not found")
    await planning_obj.update_from_dict(planning.dict()).save()
    return planning_obj

@router.delete("/scenario-plannings/{planning_id}")
async def delete_scenario_planning(planning_id: int):
    planning = await ScenarioPlanning.get_or_none(id=planning_id)
    if not planning:
        raise HTTPException(status_code=404, detail="ScenarioPlanning not found")
    await planning.delete()
    return {"message": "ScenarioPlanning deleted"}
