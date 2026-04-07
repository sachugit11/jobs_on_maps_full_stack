from rest_framework.decorators import api_view
from rest_framework.response import Response
from .data_loader import get_data


@api_view(['GET'])
def companies_list(request):
    """List all companies with their jobs and geo data."""
    data = get_data()
    
    # Filter by role category if provided
    role_filter = request.query_params.get('role', '')
    search_query = request.query_params.get('search', '').lower()
    city_filter = request.query_params.get('city', '').lower()
    
    companies = data['companies']
    
    # Apply filters
    result = []
    for company in companies:
        # Filter by city
        if city_filter and company['city'].lower() != city_filter:
            continue
        
        # Filter jobs within company
        filtered_jobs = company['jobs']
        
        if role_filter:
            role_filters = [r.strip().lower() for r in role_filter.split(',')]
            filtered_jobs = [
                j for j in filtered_jobs
                if j['role_category'].lower() in role_filters
            ]
        
        if search_query:
            filtered_jobs = [
                j for j in filtered_jobs
                if search_query in j['title'].lower() or
                   search_query in j['company_name'].lower()
            ]
        
        if filtered_jobs:
            company_copy = {**company, 'jobs': filtered_jobs}
            result.append(company_copy)
    
    return Response({
        'count': len(result),
        'results': result,
    })


@api_view(['GET'])
def jobs_list(request):
    """List all jobs with optional filtering."""
    data = get_data()
    
    role_filter = request.query_params.get('role', '')
    search_query = request.query_params.get('search', '').lower()
    company_filter = request.query_params.get('company', '').lower()
    
    jobs = data['jobs']
    
    if role_filter:
        role_filters = [r.strip().lower() for r in role_filter.split(',')]
        jobs = [j for j in jobs if j['role_category'].lower() in role_filters]
    
    if search_query:
        jobs = [
            j for j in jobs
            if search_query in j['title'].lower() or
               search_query in j['company_name'].lower()
        ]
    
    if company_filter:
        jobs = [j for j in jobs if j['company_name'].lower() == company_filter]
    
    return Response({
        'count': len(jobs),
        'results': jobs,
    })


@api_view(['GET'])
def roles_list(request):
    """List all available role categories."""
    data = get_data()
    return Response({
        'roles': data['roles'],
    })


@api_view(['GET'])
def health_check(request):
    """Health check endpoint."""
    return Response({'status': 'ok'})
