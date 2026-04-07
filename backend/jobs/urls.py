from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.companies_list, name='companies-list'),
    path('jobs/', views.jobs_list, name='jobs-list'),
    path('roles/', views.roles_list, name='roles-list'),
    path('health/', views.health_check, name='health-check'),
]
