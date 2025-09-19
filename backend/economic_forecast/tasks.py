from django_q.tasks import schedule
from django_q.models import Schedule
from django.utils.timezone import now
from datetime import timedelta

def schedule_news_scraping():
    # Schedule the scrape_news command to run every 10 seconds
    # Remove existing schedule if any
    Schedule.objects.filter(func='django.core.management.call_command', args='scrape_news').delete()

    schedule(
        'django.core.management.call_command',
        'scrape_news',
        schedule_type=Schedule.SECONDS,
        seconds=10,
        repeats=-1,
        next_run=now() + timedelta(seconds=10),
        name='Scrape Economic News Every 10 Seconds'
    )
