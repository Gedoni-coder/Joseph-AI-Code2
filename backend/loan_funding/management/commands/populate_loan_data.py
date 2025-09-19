from django.core.management.base import BaseCommand
from loan_funding.models import *
from datetime import datetime, timezone

class Command(BaseCommand):
    help = 'Populate loan and funding data'

    def handle(self, *args, **options):
        self.stdout.write('Populating loan and funding data...')

        # Create LoanEligibility
        loan_eligibility = LoanEligibility.objects.create(
            id="1",
            business_name="TechStartup Inc",
            business_stage="growth",
            credit_score=745,
            monthly_revenue=125000.00,
            yearly_revenue=1500000.00,
            collateral_value=450000.00,
            industry="Technology",
            time_in_business=28,
            eligibility_score=87,
            qualified_programs=[
                "SBA 7(a) Loan",
                "Business Line of Credit",
                "Equipment Financing",
                "Revenue-Based Financing",
            ],
            recommendations=[
                "Consider SBA 7(a) for expansion capital with favorable terms",
                "Line of credit for working capital flexibility",
                "Equipment financing for technology upgrades at lower rates",
            ],
        )

        # Create FundingOptions
        funding_options_data = [
            {
                "id": "1",
                "name": "SBA 7(a) General Business Loan",
                "type": "government-grant",
                "provider": "U.S. Small Business Administration",
                "min_amount": 25000.00,
                "max_amount": 5000000.00,
                "interest_rate": 6.5,
                "term_months": 120,
                "eligibility_criteria": [
                    "Small business as defined by SBA",
                    "For-profit business",
                    "Meet SBA size standards",
                    "Good credit history",
                ],
                "processing_time": 45,
                "collateral_required": True,
                "personal_guarantee": True,
                "description": "Flexible loan program for general business purposes including working capital, equipment, and real estate.",
                "website": "https://sba.gov",
                "tags": ["Government", "Low Interest", "Flexible Terms"],
            },
            {
                "id": "2",
                "name": "Business Line of Credit",
                "type": "bank-loan",
                "provider": "First National Bank",
                "min_amount": 10000.00,
                "max_amount": 1000000.00,
                "interest_rate": 8.25,
                "term_months": 12,
                "eligibility_criteria": [
                    "Minimum $100K annual revenue",
                    "2+ years in business",
                    "Credit score 650+",
                    "Positive cash flow",
                ],
                "processing_time": 14,
                "collateral_required": False,
                "personal_guarantee": True,
                "description": "Revolving credit facility for short-term working capital needs with flexible draw and repayment options.",
                "website": "https://firstnational.com",
                "tags": ["Flexible", "Quick Approval", "Working Capital"],
            },
        ]

        for option_data in funding_options_data:
            FundingOption.objects.create(**option_data)

        # Create LoanComparisons
        loan_comparisons_data = [
            {
                "id": "1",
                "loan_name": "SBA 7(a) Loan",
                "provider": "First Community Bank",
                "amount": 250000.00,
                "interest_rate": 6.5,
                "term_months": 120,
                "monthly_payment": 2840.00,
                "total_interest": 90800.00,
                "conditions": [
                    "Personal guarantee required",
                    "Collateral may be required for loans over $350K",
                    "Business must meet SBA size standards",
                    "Funds cannot be used for speculation or investment",
                ],
                "processing_time": 45,
                "approval_odds": 78,
                "pros": [
                    "Low interest rate",
                    "Long repayment term",
                    "Government backing reduces lender risk",
                ],
                "cons": [
                    "Lengthy application process",
                    "Strict qualification requirements",
                    "Personal guarantee required",
                ],
            },
            {
                "id": "2",
                "loan_name": "Traditional Business Loan",
                "provider": "Regional Bank",
                "amount": 250000.00,
                "interest_rate": 9.25,
                "term_months": 84,
                "monthly_payment": 3580.00,
                "total_interest": 116720.00,
                "conditions": [
                    "Minimum 2 years in business",
                    "Personal and business credit review",
                    "Debt service coverage ratio of 1.25x",
                    "Annual financial statements required",
                ],
                "processing_time": 30,
                "approval_odds": 65,
                "pros": [
                    "Faster processing than SBA",
                    "Established banking relationship",
                    "Flexible use of funds",
                ],
                "cons": [
                    "Higher interest rate",
                    "Shorter repayment term",
                    "Stricter cash flow requirements",
                ],
            },
        ]

        for comparison_data in loan_comparisons_data:
            LoanComparison.objects.create(**comparison_data)

        # Create ApplicationDocuments
        application_documents_data = [
            {
                "id": "1",
                "name": "Business Plan",
                "type": "required",
                "description": "Comprehensive business plan including market analysis, financial projections, and strategy",
                "template": "SBA Business Plan Template",
                "status": "pending",
            },
            {
                "id": "2",
                "name": "Financial Statements",
                "type": "required",
                "description": "Last 3 years of business financial statements (P&L, Balance Sheet, Cash Flow)",
                "status": "pending",
            },
            {
                "id": "3",
                "name": "Tax Returns",
                "type": "required",
                "description": "Personal and business tax returns for the last 3 years",
                "status": "pending",
            },
            {
                "id": "4",
                "name": "Bank Statements",
                "type": "required",
                "description": "Business bank statements for the last 12 months",
                "status": "pending",
            },
            {
                "id": "5",
                "name": "Credit Report Authorization",
                "type": "required",
                "description": "Signed authorization for lender to pull personal and business credit reports",
                "status": "pending",
            },
        ]

        for doc_data in application_documents_data:
            ApplicationDocument.objects.create(**doc_data)

        # Create BusinessPlan
        business_plan = BusinessPlan.objects.create(
            id="1",
            completion_percentage=67,
            last_updated=datetime(2024, 12, 10, 14, 30, tzinfo=timezone.utc),
            generated_content=True,
        )

        # Create BusinessPlanSections
        business_plan_sections_data = [
            {
                "id": "1",
                "title": "Executive Summary",
                "content": "TechStartup Inc is a growing technology company specializing in cloud-based analytics solutions...",
                "completed": True,
                "word_count": 450,
                "recommendations": [
                    "Highlight unique value proposition",
                    "Include key financial highlights",
                ],
            },
            {
                "id": "2",
                "title": "Market Analysis",
                "content": "The cloud analytics market is projected to grow at 15.2% CAGR...",
                "completed": True,
                "word_count": 680,
                "recommendations": [
                    "Add competitive landscape analysis",
                    "Include addressable market size",
                ],
            },
            {
                "id": "3",
                "title": "Financial Projections",
                "content": "",
                "completed": False,
                "word_count": 0,
                "recommendations": [
                    "Include 5-year revenue projections",
                    "Add break-even analysis",
                ],
            },
        ]

        for section_data in business_plan_sections_data:
            BusinessPlanSection.objects.create(**section_data)

        # Create FundingStrategy
        funding_strategy = FundingStrategy.objects.create(
            id="1",
            business_stage="Growth Stage",
            recommended_type="hybrid",
            reasoning="Based on your growth stage and capital needs, a combination of debt and equity financing would optimize cost of capital while maintaining control.",
            readiness_score=82,
            recommendations=[
                "Strengthen financial projections before Series A",
                "Build strategic advisory board",
                "Improve operational metrics for investor presentation",
            ],
        )

        # Create FundingTimeline
        funding_timeline_data = [
            {
                "phase": "Immediate (0-6 months)",
                "timeframe": "Q1 2025",
                "amount": 250000.00,
                "type": "SBA Loan",
                "milestones": [
                    "Product development completion",
                    "Team expansion",
                    "Market entry",
                ],
            },
            {
                "phase": "Growth (6-18 months)",
                "timeframe": "Q2-Q4 2025",
                "amount": 750000.00,
                "type": "Series A",
                "milestones": [
                    "Revenue growth",
                    "Market validation",
                    "Operational scaling",
                ],
            },
        ]

        for timeline_data in funding_timeline_data:
            FundingTimeline.objects.create(**timeline_data)

        # Create EquityImpact
        equity_impact = EquityImpact.objects.create(
            dilution=25.0,
            ownership_retained=75.0,
            control_impact="Maintain majority control with board seat to investor",
            future_rounds=[
                "Series B potential in 18-24 months",
                "Exit opportunities in 5-7 years",
            ],
        )

        # Create DebtImpact
        debt_impact = DebtImpact.objects.create(
            monthly_payment=2840.00,
            total_cost=340800.00,
            cash_flow_impact=-15.0,
            collateral_risk="Business assets at risk, personal guarantee required",
        )

        # Create InvestorMatch
        investor_match = InvestorMatch.objects.create(
            id="1",
            name="TechVentures Capital",
            type="vc",
            focus_industries=["Technology", "SaaS", "AI/ML"],
            investment_range_min=500000.00,
            investment_range_max=5000000.00,
            stage=["Seed", "Series A", "Series B"],
            location="San Francisco, CA",
            match_score=94,
            trust_score=89,
            portfolio=[
                "CloudTech Solutions",
                "DataDriven Analytics",
                "AI Innovations",
            ],
        )

        # Create RecentInvestments
        recent_investments_data = [
            {
                "company": "CloudFlow Inc",
                "amount": 2000000.00,
                "date": datetime(2024, 11, 15).date(),
                "industry": "Cloud Infrastructure",
            },
            {
                "company": "Analytics Pro",
                "amount": 1500000.00,
                "date": datetime(2024, 10, 8).date(),
                "industry": "Business Intelligence",
            },
        ]

        for investment_data in recent_investments_data:
            RecentInvestment.objects.create(**investment_data)

        # Create ContactInfo
        contact_info = ContactInfo.objects.create(
            email="investments@techventures.com",
            website="https://techventures.com",
            application_process="Online application with pitch deck and executive summary",
        )

        # Create InvestorPreferences
        investor_preferences = InvestorPreferences.objects.create(
            business_model=["B2B SaaS", "Subscription", "Marketplace"],
            growth_stage=["Early Growth", "Scaling"],
            revenue_requirement=1000000.00,
            geographic_focus=["North America", "Europe"],
            time_to_decision=45,
        )

        # Create LoanUpdates
        loan_updates_data = [
            {
                "id": "1",
                "type": "rate-change",
                "title": "SBA Prime Rate Decreased to 6.5%",
                "description": "The SBA has announced a 0.25% reduction in prime lending rates, effective immediately for new loan applications.",
                "impact": "positive",
                "urgency": "medium",
                "source": "U.S. Small Business Administration",
                "publish_date": datetime(2024, 12, 12, 9, 0, tzinfo=timezone.utc),
                "affected_programs": ["SBA 7(a)", "SBA 504", "SBA Microloans"],
                "action_required": "Consider applying for SBA loans while rates are favorable",
            },
            {
                "id": "2",
                "type": "new-program",
                "title": "New State Technology Grant Program Launched",
                "description": "$50M grant program for technology companies in early growth stage, offering up to $100K per business.",
                "impact": "positive",
                "urgency": "high",
                "source": "State Economic Development",
                "publish_date": datetime(2024, 12, 11, 10, 30, tzinfo=timezone.utc),
                "expiry_date": datetime(2025, 3, 15, 23, 59, 59, tzinfo=timezone.utc),
                "affected_programs": ["State Tech Grant 2025"],
                "action_required": "Applications due March 15, 2025 - prepare application materials",
            },
        ]

        for update_data in loan_updates_data:
            LoanUpdate.objects.create(**update_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated loan and funding data'))
