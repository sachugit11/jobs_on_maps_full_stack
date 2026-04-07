from django.db import models


class Company(models.Model):
    """Company model with geo-location data."""
    name = models.CharField(max_length=255, unique=True)
    address = models.TextField(blank=True, default='')
    city = models.CharField(max_length=100, default='Bengaluru')
    latitude = models.FloatField()
    longitude = models.FloatField()
    logo = models.CharField(max_length=255, blank=True, default='')

    class Meta:
        verbose_name_plural = 'companies'
        ordering = ['name']

    def __str__(self):
        return self.name


class Job(models.Model):
    """Job listing model."""
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=255)
    role_category = models.CharField(max_length=100, blank=True, default='')
    posted_on = models.CharField(max_length=100, blank=True, default='')
    apply_link = models.URLField(max_length=500)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.title} at {self.company.name}"
