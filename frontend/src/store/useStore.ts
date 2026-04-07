import { create } from 'zustand';
import { Company, Filters } from '@/types';

interface AppState {
  filters: Filters;
  selectedCompany: Company | null;
  sidebarOpen: boolean;
  mapCenter: [number, number];
  mapZoom: number;
  completedOnboarding: boolean;

  setFilters: (filters: Partial<Filters>) => void;
  setSelectedCompany: (company: Company | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
  resetFilters: () => void;
  setCompletedOnboarding: (completed: boolean) => void;
}

const defaultFilters: Filters = {
  city: 'Bengaluru',
  roles: [],
  search: '',
};

export const useStore = create<AppState>((set) => ({
  filters: defaultFilters,
  selectedCompany: null,
  sidebarOpen: false,
  mapCenter: [12.9716, 77.5946],
  mapZoom: 12,
  completedOnboarding: false,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSelectedCompany: (company) =>
    set({ selectedCompany: company, sidebarOpen: company !== null }),

  setSidebarOpen: (open) =>
    set({ sidebarOpen: open, selectedCompany: open ? undefined : null }),

  setMapCenter: (center) => set({ mapCenter: center }),
  setMapZoom: (zoom) => set({ mapZoom: zoom }),

  resetFilters: () => set({ filters: defaultFilters }),

  setCompletedOnboarding: (completed) => set({ completedOnboarding: completed }),
}));
