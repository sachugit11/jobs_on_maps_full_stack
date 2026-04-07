# GeoJobs – Implementation Plan

## Overview
Map-based Job Discovery Platform (MVP) for Bengaluru. Users can discover jobs visually on a map with company pins, filtering, and apply links.

## Tech Stack
- **Frontend**: Next.js + TypeScript + Material UI + Tailwind CSS
- **Backend**: Django + Django REST Framework + Python
- **Database**: PostgreSQL (JSON/CSV for MVP)
- **Maps**: Leaflet.js (free, no API key needed)
- **Containerization**: Docker + docker-compose

## Architecture

### Backend (Django)
```
backend/
├── manage.py
├── config/           # Django settings
├── jobs/             # Jobs app
│   ├── models.py     # Company, Job models
│   ├── serializers.py
│   ├── views.py      # API views
│   ├── urls.py
│   ├── data_loader.py  # CSV/JSON data adapter
│   └── management/commands/load_jobs.py
├── requirements.txt
└── Dockerfile
```

### Frontend (Next.js)
```
frontend/
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # React components
│   │   ├── Map/
│   │   ├── JobList/
│   │   ├── Filters/
│   │   └── Layout/
│   ├── hooks/        # Custom hooks
│   ├── store/        # Zustand store
│   ├── types/        # TypeScript types
│   └── lib/          # Utilities
├── public/
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── Dockerfile
```

## Features (MVP)
1. Interactive map with company pins (Leaflet + marker clustering)
2. Click pin → job listing popup with apply links
3. Role-based filtering (multi-select)
4. Location dropdown (Bengaluru)
5. Search input for roles
6. Responsive design
7. Static/random company logos

## API Endpoints
- `GET /api/jobs/` - List all jobs with filters
- `GET /api/companies/` - List companies with geo data
- `GET /api/roles/` - List available role categories
