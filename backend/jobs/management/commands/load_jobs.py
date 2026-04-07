"""Management command to load jobs from JSON into the database."""
import json
from django.core.management.base import BaseCommand
from django.conf import settings
from jobs.models import Company, Job
from jobs.data_loader import categorize_role


class Command(BaseCommand):
    help = 'Load jobs from JSON data file into the database'

    def handle(self, *args, **options):
        data_file = settings.JOBS_DATA_FILE
        
        with open(data_file, 'r') as f:
            raw_data = json.load(f)
        
        companies_created = 0
        jobs_created = 0
        
        for item in raw_data:
            company, created = Company.objects.get_or_create(
                name=item['company'],
                defaults={
                    'address': item.get('address', ''),
                    'city': item.get('city', 'Bengaluru'),
                    'latitude': item.get('lat', 0),
                    'longitude': item.get('lon', 0),
                }
            )
            if created:
                companies_created += 1
            
            Job.objects.get_or_create(
                company=company,
                title=item.get('role', ''),
                defaults={
                    'role_category': categorize_role(item.get('role', '')),
                    'posted_on': item.get('posted', ''),
                    'apply_link': item.get('linkedin_url', ''),
                }
            )
            jobs_created += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Loaded {companies_created} companies and {jobs_created} jobs'
            )
        )
