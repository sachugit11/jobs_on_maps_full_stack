"""Data loader module - adapter pattern for data source switching."""
import json
from pathlib import Path
from django.conf import settings


def categorize_role(title: str) -> str:
    """Derive a role category from job title."""
    title_lower = title.lower()
    
    categories = {
        'Frontend': ['frontend', 'ui', 'react', 'angular', 'vue', 'css', 'html'],
        'Backend': ['backend', 'api', 'server', 'django', 'flask', 'node', 'express'],
        'Full Stack': ['full stack', 'fullstack'],
        'Mobile': ['mobile', 'android', 'ios', 'flutter', 'react native'],
        'DevOps': ['devops', 'sre', 'infrastructure', 'cloud', 'aws', 'azure'],
        'Data Science': ['data scientist', 'machine learning', 'ml', 'ai', 'deep learning'],
        'Data Engineering': ['data engineer', 'etl', 'pipeline', 'spark'],
        'QA': ['qa', 'test', 'quality', 'automation'],
        'Embedded': ['embedded', 'firmware', 'iot', 'hardware'],
        'System': ['system', 'kernel', 'os', 'platform'],
        'Security': ['security', 'cyber', 'infosec'],
    }
    
    for category, keywords in categories.items():
        if any(kw in title_lower for kw in keywords):
            return category
    
    return 'Software Engineering'


def load_jobs_from_json() -> dict:
    """Load jobs from JSON file and return structured data."""
    data_file = settings.JOBS_DATA_FILE
    
    if not Path(data_file).exists():
        return {'companies': [], 'jobs': [], 'roles': []}
    
    with open(data_file, 'r') as f:
        raw_data = json.load(f)
    
    companies_map = {}
    jobs_list = []
    roles_set = set()
    
    for idx, item in enumerate(raw_data):
        company_name = item.get('company', '')
        
        if company_name not in companies_map:
            companies_map[company_name] = {
                'id': len(companies_map) + 1,
                'name': company_name,
                'address': item.get('address', ''),
                'city': item.get('city', 'Bengaluru'),
                'latitude': item.get('lat', 0),
                'longitude': item.get('lon', 0),
                'logo': '',
                'jobs': [],
            }
        
        role_category = categorize_role(item.get('role', ''))
        roles_set.add(role_category)
        
        job = {
            'id': idx + 1,
            'company_id': companies_map[company_name]['id'],
            'company_name': company_name,
            'title': item.get('role', ''),
            'role_category': role_category,
            'posted_on': item.get('posted', ''),
            'apply_link': item.get('linkedin_url', ''),
        }
        
        jobs_list.append(job)
        companies_map[company_name]['jobs'].append(job)
    
    return {
        'companies': list(companies_map.values()),
        'jobs': jobs_list,
        'roles': sorted(list(roles_set)),
    }


_cached_data = None


def get_data() -> dict:
    """Get job data with caching (for JSON mode)."""
    global _cached_data
    if _cached_data is None:
        _cached_data = load_jobs_from_json()
    return _cached_data


def refresh_cache():
    """Force refresh of cached data."""
    global _cached_data
    _cached_data = None
