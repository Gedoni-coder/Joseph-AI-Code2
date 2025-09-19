from django.core.management.base import BaseCommand
from economic_forecast.models import EconomicNews
from django.utils import timezone
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import os

class Command(BaseCommand):
    help = 'Scrape economic news from specified websites and update the database'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Configure Gemini API
        api_key = os.getenv('GEMINI_API_KEY')
        if api_key:
            genai.configure(api_key=api_key)
        else:
            self.stdout.write(self.style.WARNING('GEMINI_API_KEY not found. Summarization will use fallback method.'))

    def scrape_economist(self):
        """Scrape news from economist.com"""
        url = 'https://www.economist.com/finance-and-economics/'
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = soup.find_all('article', limit=5)
            news = []
            for article in articles:
                title_elem = article.find('h3') or article.find('h2')
                if title_elem:
                    title = title_elem.get_text().strip()
                    link = article.find('a')['href'] if article.find('a') else ''
                    summary = self.summarize_text(title)  # Use title as base for summary
                    news.append({
                        'title': title,
                        'summary': summary,
                        'source': 'The Economist',
                        'category': 'Finance and Economics',
                        'impact': self.determine_impact(title),
                        'timestamp': timezone.now(),
                        'context': 'international'
                    })
            return news
        except Exception as e:
            self.stdout.write(f"Error scraping Economist: {e}")
            return []

    def scrape_reuters(self):
        """Scrape news from reuters.com"""
        url = 'https://www.reuters.com/business/'
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = soup.find_all('article', limit=5)
            news = []
            for article in articles:
                title_elem = article.find('h3') or article.find('h2')
                if title_elem:
                    title = title_elem.get_text().strip()
                    summary = self.summarize_text(title)
                    news.append({
                        'title': title,
                        'summary': summary,
                        'source': 'Reuters',
                        'category': 'Business',
                        'impact': self.determine_impact(title),
                        'timestamp': timezone.now(),
                        'context': 'international'
                    })
            return news
        except Exception as e:
            self.stdout.write(f"Error scraping Reuters: {e}")
            return []

    def scrape_bloomberg(self):
        """Scrape news from bloomberg.com/business"""
        url = 'https://www.bloomberg.com/businessweek'
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = soup.find_all('article', limit=5)
            news = []
            for article in articles:
                title_elem = article.find('h3') or article.find('h2')
                if title_elem:
                    title = title_elem.get_text().strip()
                    summary = self.summarize_text(title)
                    news.append({
                        'title': title,
                        'summary': summary,
                        'source': 'Bloomberg Businessweek',
                        'category': 'Business',
                        'impact': self.determine_impact(title),
                        'timestamp': timezone.now(),
                        'context': 'international'
                    })
            return news
        except Exception as e:
            self.stdout.write(f"Error scraping Bloomberg: {e}")
            return []

    def scrape_ft(self):
        """Scrape news from ft.com"""
        url = 'https://www.ft.com/world'
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = soup.find_all('div', class_='o-teaser__content', limit=5)
            news = []
            for article in articles:
                title_elem = article.find('a', class_='js-teaser-heading-link')
                if title_elem:
                    title = title_elem.get_text().strip()
                    summary = self.summarize_text(title)
                    news.append({
                        'title': title,
                        'summary': summary,
                        'source': 'Financial Times',
                        'category': 'World News',
                        'impact': self.determine_impact(title),
                        'timestamp': timezone.now(),
                        'context': 'international'
                    })
            return news
        except Exception as e:
            self.stdout.write(f"Error scraping FT: {e}")
            return []

    def scrape_cnbc(self):
        """Scrape news from cnbc.com"""
        url = 'https://www.cnbc.com/economy/'
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = soup.find_all('div', class_='Card-titleContainer', limit=5)
            news = []
            for article in articles:
                title_elem = article.find('a')
                if title_elem:
                    title = title_elem.get_text().strip()
                    summary = self.summarize_text(title)
                    news.append({
                        'title': title,
                        'summary': summary,
                        'source': 'CNBC',
                        'category': 'Economy',
                        'impact': self.determine_impact(title),
                        'timestamp': timezone.now(),
                        'context': 'international'
                    })
            return news
        except Exception as e:
            self.stdout.write(f"Error scraping CNBC: {e}")
            return []

    def summarize_text(self, text):
        """Use Gemini to summarize the text"""
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = f"Summarize this news headline in 2-3 sentences: {text}"
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            self.stdout.write(f"Error summarizing: {e}")
            return text[:200] + "..."  # Fallback to truncation

    def determine_impact(self, title):
        """Determine impact based on keywords"""
        positive_words = ['rise', 'increase', 'growth', 'surge', 'boost', 'gain', 'up', 'positive', 'strong']
        negative_words = ['fall', 'decline', 'drop', 'crash', 'slump', 'loss', 'down', 'negative', 'weak']
        title_lower = title.lower()
        if any(word in title_lower for word in positive_words):
            return 'high'
        elif any(word in title_lower for word in negative_words):
            return 'low'
        else:
            return 'medium'

    def handle(self, *args, **options):
        self.stdout.write('Starting news scraping...')

        all_news = []
        all_news.extend(self.scrape_economist())
        all_news.extend(self.scrape_reuters())
        all_news.extend(self.scrape_bloomberg())
        all_news.extend(self.scrape_ft())
        all_news.extend(self.scrape_cnbc())

        # Clear old news and add new
        EconomicNews.objects.all().delete()

        for news_item in all_news:
            EconomicNews.objects.create(**news_item)

        self.stdout.write(self.style.SUCCESS(f'Successfully scraped and saved {len(all_news)} news items'))
