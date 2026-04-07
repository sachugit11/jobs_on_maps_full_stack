import axios from 'axios';
import { CompaniesResponse, RolesResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://jobs-on-maps-full-stack-2.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchCompanies(params?: {
  role?: string;
  search?: string;
  city?: string;
}): Promise<CompaniesResponse> {
  const { data } = await api.get('/companies/', { params });
  return data;
}

export async function fetchRoles(): Promise<RolesResponse> {
  const { data } = await api.get('/roles/');
  return data;
}

export default api;
