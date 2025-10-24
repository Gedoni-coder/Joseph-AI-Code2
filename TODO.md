# Fix Production Planning and Inventory Analytics Display Issues

## Information Gathered
- Production Planning component references non-existent properties: `plan.productionLine`, `plan.priority`, `operation.location`, `operation.operationType`, `operation.quantity`, `operation.duration`
- Inventory Analytics component uses incorrect property names: `item.quantity` instead of `item.currentStock`, `item.unit` instead of proper cost references, `ds.unitCost` instead of `ds.currentValue`, `audit.accuracyPercentage` instead of `audit.accuracy`
- WarehouseOperation interface lacks properties expected by Production Planning component

## Plan
1. Update ProductionPlan interface in src/lib/supply-chain-data.ts to add missing properties
2. Update productionPlans mock data to include new properties
3. Fix Production Planning component to use correct WarehouseOperation properties
4. Fix Inventory Analytics component property references
5. Test the fixes by checking the tabs display properly

## Dependent Files to Edit
- src/lib/supply-chain-data.ts (interface and mock data updates)
- src/components/supply-chain/production-planning.tsx (property fixes)
- src/components/inventory/inventory-analytics.tsx (property fixes)

## Followup Steps
- Verify Production Planning tab displays without errors
- Verify Inventory Analytics tab displays without errors
- Test navigation between tabs
