from django.contrib import admin
from .models import Company, Job

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'latitude', 'longitude')
    search_fields = ('name', 'city')

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'role_category', 'posted_on')
    list_filter = ('role_category',)
    search_fields = ('title', 'company__name')
