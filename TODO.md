# Debug Economic Forecasting Page TODO

## Overview
Debug and fix issues with the economic forecasting page (Index.tsx) where the MetricsDashboard component is not displaying data properly.

## Current Status
- MetricsDashboard component exists and is used in Index.tsx
- Backend API endpoints are configured but database lacks sample data for metrics, forecasts, and events
- Frontend hook has parameter mismatch issues
- No error handling for empty data scenarios

## TODO Items

### 1. Create Sample Data Population Command
- [ ] Create Django management command `populate_sample_data.py`
- [ ] Add sample EconomicMetric data for all contexts (local, national, state, international)
- [ ] Add sample EconomicForecast data
- [ ] Add sample EconomicEvent data
- [ ] Test command execution

### 2. Fix useEconomicData Hook
- [ ] Update refreshData function to accept optional context parameter
- [ ] Add better error handling for API failures
- [ ] Improve loading states and data validation

### 3. Fix Index.tsx Refresh Call
- [ ] Remove context parameter from refreshData call in Index.tsx
- [ ] Add proper error handling for data refresh

### 4. Test API Endpoints
- [ ] Start Django backend server
- [ ] Test /api/economic/metrics/ endpoint returns data
- [ ] Test /api/economic/forecasts/ endpoint
- [ ] Test /api/economic/events/ endpoint
- [ ] Verify data grouping by context works

### 5. Frontend Testing
- [ ] Test MetricsDashboard renders with sample data
- [ ] Verify context switching functionality
- [ ] Test auto-scroll and manual navigation
- [ ] Check error states and loading indicators

### 6. Integration Testing
- [ ] End-to-end test of data flow from backend to frontend
- [ ] Test real-time updates and streaming simulation
- [ ] Verify responsive design and mobile compatibility

## Dependencies
- Django backend with economic_forecast app
- React frontend with economic components
- Database with proper migrations applied

## Notes
- Backend news scraping is already working
- Frontend UI components are implemented
- Focus on data population and API integration fixes
