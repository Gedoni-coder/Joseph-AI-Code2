from django.core.management.base import BaseCommand
from market_analysis.models import MarketSegment, Competitor, MarketTrend
from datetime import date

class Command(BaseCommand):
    help = 'Populate database with initial market analysis mock data'

    def handle(self, *args, **options):
        # Market Segments
        MarketSegment.objects.all().delete()
        tech_segment = MarketSegment.objects.create(
            name="Technology",
            description="Software and IT services market",
            market_size=5000000000,
            growth_rate=8.5,
        )
        healthcare_segment = MarketSegment.objects.create(
            name="Healthcare",
            description="Medical and healthcare services",
            market_size=3000000000,
            growth_rate=6.2,
        )
        finance_segment = MarketSegment.objects.create(
            name="Financial Services",
            description="Banking and financial services",
            market_size=4000000000,
            growth_rate=4.8,
        )

        # Competitors
        Competitor.objects.all().delete()
        Competitor.objects.create(
            name="TechCorp Inc.",
            market_segment=tech_segment,
            market_share=15.5,
            strengths="Strong R&D, Global presence",
            weaknesses="High operational costs",
        )
        Competitor.objects.create(
            name="InnovateSoft",
            market_segment=tech_segment,
            market_share=12.3,
            strengths="Agile development, Customer focus",
            weaknesses="Limited market reach",
        )
        Competitor.objects.create(
            name="MediCare Solutions",
            market_segment=healthcare_segment,
            market_share=18.7,
            strengths="Regulatory compliance, Specialized expertise",
            weaknesses="Slow innovation cycle",
        )
        Competitor.objects.create(
            name="FinTech Global",
            market_segment=finance_segment,
            market_share=22.1,
            strengths="Financial expertise, Trust",
            weaknesses="Legacy systems",
        )

        # Market Trends
        MarketTrend.objects.all().delete()
        MarketTrend.objects.create(
            title="AI Adoption in Business",
            description="Increasing adoption of artificial intelligence across industries",
            impact="High",
            start_date=date(2023, 1, 1),
            end_date=date(2025, 12, 31),
        )
        MarketTrend.objects.create(
            title="Remote Work Culture",
            description="Shift towards permanent remote work arrangements",
            impact="Medium",
            start_date=date(2020, 3, 1),
        )
        MarketTrend.objects.create(
            title="Sustainable Practices",
            description="Growing emphasis on environmental sustainability",
            impact="High",
            start_date=date(2022, 6, 1),
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with market analysis mock data'))
