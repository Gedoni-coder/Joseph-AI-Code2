from django.core.management.base import BaseCommand
from economic_forecast.models import EconomicMetric, EconomicForecast, EconomicEvent
from django.utils import timezone
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Populate sample data for economic forecasting models'

    def handle(self, *args, **options):
        self.stdout.write('Populating sample economic data...')

        # Clear existing data
        EconomicMetric.objects.all().delete()
        EconomicForecast.objects.all().delete()
        EconomicEvent.objects.all().delete()

        # Sample Economic Metrics
        metrics_data = [
            # National Context
            {
                'context': 'national',
                'name': 'GDP Growth',
                'value': 2.3,
                'change': 0.1,
                'unit': '%',
                'trend': 'up',
                'category': 'Growth'
            },
            {
                'context': 'national',
                'name': 'Inflation Rate',
                'value': 3.1,
                'change': -0.2,
                'unit': '%',
                'trend': 'down',
                'category': 'Prices'
            },
            {
                'context': 'national',
                'name': 'Unemployment Rate',
                'value': 4.2,
                'change': -0.3,
                'unit': '%',
                'trend': 'down',
                'category': 'Employment'
            },
            {
                'context': 'national',
                'name': 'Federal Funds Rate',
                'value': 5.25,
                'change': 0.25,
                'unit': '%',
                'trend': 'up',
                'category': 'Monetary Policy'
            },
            {
                'context': 'national',
                'name': 'S&P 500 Index',
                'value': 4200.5,
                'change': 45.2,
                'unit': 'Points',
                'trend': 'up',
                'category': 'Markets'
            },

            # International Context
            {
                'context': 'international',
                'name': 'USD/EUR Exchange Rate',
                'value': 1.085,
                'change': -0.005,
                'unit': 'USD/EUR',
                'trend': 'down',
                'category': 'Currency'
            },
            {
                'context': 'international',
                'name': 'Brent Crude Oil',
                'value': 78.5,
                'change': 2.1,
                'unit': 'USD/barrel',
                'trend': 'up',
                'category': 'Commodities'
            },
            {
                'context': 'international',
                'name': 'Global PMI',
                'value': 52.3,
                'change': 1.2,
                'unit': 'Index',
                'trend': 'up',
                'category': 'Manufacturing'
            },

            # State Context (using California as example)
            {
                'context': 'state',
                'name': 'State GDP Growth',
                'value': 2.8,
                'change': 0.3,
                'unit': '%',
                'trend': 'up',
                'category': 'Growth'
            },
            {
                'context': 'state',
                'name': 'Housing Price Index',
                'value': 285.4,
                'change': 5.2,
                'unit': 'Index',
                'trend': 'up',
                'category': 'Housing'
            },

            # Local Context (using city-level data)
            {
                'context': 'local',
                'name': 'Local Employment Rate',
                'value': 96.2,
                'change': 0.5,
                'unit': '%',
                'trend': 'up',
                'category': 'Employment'
            },
            {
                'context': 'local',
                'name': 'Average Home Price',
                'value': 650000,
                'change': 15000,
                'unit': 'USD',
                'trend': 'up',
                'category': 'Housing'
            }
        ]

        for metric_data in metrics_data:
            EconomicMetric.objects.create(**metric_data)

        # Sample Economic Forecasts
        forecasts_data = [
            {
                'context': 'national',
                'indicator': 'GDP Growth Q4 2024',
                'period': 'Q4 2024',
                'forecast': 2.1,
                'confidence': 75,
                'range_low': 1.8,
                'range_high': 2.4
            },
            {
                'context': 'national',
                'indicator': 'Inflation Rate Dec 2024',
                'period': 'Dec 2024',
                'forecast': 2.8,
                'confidence': 80,
                'range_low': 2.5,
                'range_high': 3.1
            },
            {
                'context': 'international',
                'indicator': 'USD/EUR Rate Dec 2024',
                'period': 'Dec 2024',
                'forecast': 1.08,
                'confidence': 65,
                'range_low': 1.05,
                'range_high': 1.11
            },
            {
                'context': 'international',
                'indicator': 'Brent Oil Price Dec 2024',
                'period': 'Dec 2024',
                'forecast': 75.0,
                'confidence': 70,
                'range_low': 70.0,
                'range_high': 80.0
            }
        ]

        for forecast_data in forecasts_data:
            EconomicForecast.objects.create(**forecast_data)

        # Sample Economic Events
        events_data = [
            {
                'context': 'national',
                'title': 'Federal Reserve FOMC Meeting',
                'date': date.today() + timedelta(days=7),
                'description': 'Federal Open Market Committee meeting to decide on monetary policy. Market expects 25bps rate cut.',
                'impact': 'high',
                'category': 'Monetary Policy'
            },
            {
                'context': 'national',
                'title': 'Q3 GDP Data Release',
                'date': date.today() + timedelta(days=14),
                'description': 'Third quarter Gross Domestic Product data will be released by Bureau of Economic Analysis.',
                'impact': 'high',
                'category': 'Economic Data'
            },
            {
                'context': 'international',
                'title': 'ECB Monetary Policy Announcement',
                'date': date.today() + timedelta(days=10),
                'description': 'European Central Bank interest rate decision and policy statement.',
                'impact': 'high',
                'category': 'Monetary Policy'
            },
            {
                'context': 'international',
                'title': 'OPEC+ Meeting',
                'date': date.today() + timedelta(days=21),
                'description': 'OPEC+ member countries meeting to discuss oil production quotas.',
                'impact': 'medium',
                'category': 'Commodities'
            },
            {
                'context': 'state',
                'title': 'State Employment Report',
                'date': date.today() + timedelta(days=3),
                'description': 'Monthly state employment and unemployment data release.',
                'impact': 'medium',
                'category': 'Employment'
            },
            {
                'context': 'local',
                'title': 'City Council Budget Meeting',
                'date': date.today() + timedelta(days=5),
                'description': 'Local government budget planning and economic development discussion.',
                'impact': 'low',
                'category': 'Government'
            }
        ]

        for event_data in events_data:
            EconomicEvent.objects.create(**event_data)

        self.stdout.write(self.style.SUCCESS(
            f'Successfully populated sample data:\n'
            f'- {len(metrics_data)} economic metrics\n'
            f'- {len(forecasts_data)} economic forecasts\n'
            f'- {len(events_data)} economic events'
        ))
