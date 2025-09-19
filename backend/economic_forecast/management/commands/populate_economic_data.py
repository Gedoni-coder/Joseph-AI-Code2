from django.core.management.base import BaseCommand
from economic_forecast.models import EconomicMetric, EconomicNews, EconomicForecast, EconomicEvent
from datetime import datetime, date
import random
import requests

class Command(BaseCommand):
    help = 'Populate economic forecast data'

    def get_world_bank_data(self, indicator):
        url = f"https://api.worldbank.org/v2/country/NG/indicator/{indicator}?format=json&per_page=1"
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if data and len(data) > 1 and data[1]:
                    latest = data[1][0]
                    return latest.get('value'), latest.get('date')
        except Exception as e:
            self.stdout.write(f"Error fetching {indicator}: {e}")
        return None, None

    def handle(self, *args, **options):
        self.stdout.write('Populating economic data...')

        # Economic Metrics - Scraped from World Bank
        gdp_value, gdp_year = self.get_world_bank_data('NY.GDP.MKTP.KD.ZG')
        inflation_value, inf_year = self.get_world_bank_data('FP.CPI.TOTL.ZG')
        unemployment_value, unemp_year = self.get_world_bank_data('SL.UEM.TOTL.ZS')
        trade_value, trade_year = self.get_world_bank_data('BN.GSR.GNFS.CD')

        metrics_data = [
            {
                'context': 'national',
                'name': 'GDP Growth',
                'value': gdp_value or 2.3,
                'change': 0.1,
                'unit': '%',
                'trend': 'up',
                'category': 'Growth',
            },
            {
                'context': 'national',
                'name': 'Inflation Rate',
                'value': inflation_value or 3.1,
                'change': -0.2,
                'unit': '%',
                'trend': 'down',
                'category': 'Prices',
            },
            {
                'context': 'national',
                'name': 'Unemployment Rate',
                'value': unemployment_value or 4.2,
                'change': -0.3,
                'unit': '%',
                'trend': 'down',
                'category': 'Labor',
            },
            {
                'context': 'national',
                'name': 'Trade Balance',
                'value': (trade_value / 1e9) if trade_value else -15.7,  # Convert to B USD
                'change': 2.1,
                'unit': 'B USD',
                'trend': 'up',
                'category': 'Trade',
            },
        ]

        for data in metrics_data:
            EconomicMetric.objects.create(**data)

        # Economic News - Nigerian Context
        news_data = [
            {
                'context': 'national',
                'title': 'Central Bank of Nigeria Maintains Monetary Policy Rate',
                'summary': 'The Central Bank of Nigeria decided to hold the Monetary Policy Rate at 18.75% to support economic stability.',
                'source': 'CBN',
                'timestamp': datetime.now(),
                'impact': 'high',
                'category': 'Monetary Policy',
            },
            {
                'context': 'national',
                'title': 'Nigeria GDP Growth Slows in Q2',
                'summary': 'Nigeria\'s economy grew by 2.51% in the second quarter, down from 3.11% in Q1, due to oil sector challenges.',
                'source': 'NBS',
                'timestamp': datetime.now(),
                'impact': 'medium',
                'category': 'Growth',
            },
        ]

        for data in news_data:
            EconomicNews.objects.create(**data)

        # Economic Forecasts - Nigerian Context
        forecasts_data = [
            {
                'context': 'national',
                'indicator': 'GDP Growth',
                'period': '2025 Q1',
                'forecast': 3.0,
                'confidence': 70,
                'range_low': 2.5,
                'range_high': 3.5,
            },
            {
                'context': 'national',
                'indicator': 'Inflation Rate',
                'period': '2025',
                'forecast': 15.0,
                'confidence': 65,
                'range_low': 12.0,
                'range_high': 18.0,
            },
        ]

        for data in forecasts_data:
            EconomicForecast.objects.create(**data)

        # Economic Events - Nigerian Context
        events_data = [
            {
                'context': 'national',
                'title': 'Central Bank of Nigeria MPC Meeting',
                'date': date(2025, 1, 31),
                'description': 'Monetary Policy Committee meeting to review interest rates and economic policies.',
                'impact': 'high',
                'category': 'Monetary Policy',
            },
            {
                'context': 'national',
                'title': 'Nigerian Economic Summit',
                'date': date(2025, 3, 15),
                'description': 'Annual summit discussing Nigeria\'s economic development and policy directions.',
                'impact': 'high',
                'category': 'Economic Development',
            },
        ]

        for data in events_data:
            EconomicEvent.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('Successfully populated economic data'))
