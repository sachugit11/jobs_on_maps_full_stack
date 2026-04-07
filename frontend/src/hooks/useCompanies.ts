'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCompanies, fetchRoles } from '@/lib/api';
import { useStore } from '@/store/useStore';

export function useCompanies() {
  const filters = useStore((s) => s.filters);

  return useQuery({
    queryKey: ['companies', filters],
    queryFn: () =>
      fetchCompanies({
        role: filters.roles.length > 0 ? filters.roles.join(',') : undefined,
        search: filters.search || undefined,
        city: filters.city || undefined,
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}
