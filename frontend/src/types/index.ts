export interface Job {
  id: number;
  company_id: number;
  company_name: string;
  title: string;
  role_category: string;
  posted_on: string;
  apply_link: string;
}

export interface Company {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  logo: string;
  jobs: Job[];
}

export interface CompaniesResponse {
  count: number;
  results: Company[];
}

export interface JobsResponse {
  count: number;
  results: Job[];
}

export interface RolesResponse {
  roles: string[];
}

export interface Filters {
  city: string;
  roles: string[];
  search: string;
}
