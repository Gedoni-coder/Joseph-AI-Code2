import os
import django
from django.core.management.base import BaseCommand
from django.core.management import call_command
import schedule
import time

class Command(BaseCommand):
    help = 'Run the news scraping scheduler every 10 seconds'

    def handle(self, *args, **options):
        # Set up Django environment
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
        django.setup()

        def scrape_news_job():
            self.stdout.write('Running scheduled news scraping...')
            try:
                call_command('scrape_news')
                self.stdout.write(self.style.SUCCESS('News scraping completed successfully'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error during news scraping: {e}'))

        # Schedule the job to run every 10 seconds
        schedule.every(10).seconds.do(scrape_news_job)

        self.stdout.write(self.style.SUCCESS('News scraping scheduler started. Press Ctrl+C to stop.'))

        # Run the scheduler
        try:
            while True:
                schedule.run_pending()
                time.sleep(1)
        except KeyboardInterrupt:
            self.stdout.write(self.style.SUCCESS('Scheduler stopped by user.'))
