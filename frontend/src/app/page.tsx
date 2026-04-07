'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import FilterBar from '@/components/FilterBar';
import JobSidebar from '@/components/JobSidebar';
import StatsBar from '@/components/StatsBar';
import Onboarding from '@/components/Onboarding';
import { useCompanies } from '@/hooks/useCompanies';
import { useStore } from '@/store/useStore';

// Leaflet must be loaded client-side only
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'column',
        gap: 2,
        background: '#0A0E1A',
      }}
    >
      <CircularProgress sx={{ color: '#6C63FF' }} />
      <Typography sx={{ color: '#94A3B8', fontSize: '0.875rem' }}>Loading map...</Typography>
    </Box>
  ),
});

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading, isError } = useCompanies();
  const completedOnboarding = useStore((s) => s.completedOnboarding);
  const selectedCompany = useStore((s) => s.selectedCompany);
  const companies = data?.results || [];

  if (isError) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
          background: '#0A0E1A',
        }}
      >
        <Typography variant="h5" sx={{ color: '#E23744' }}>
          ⚠️ Unable to load jobs
        </Typography>
        <Typography sx={{ color: '#94A3B8' }}>
          Please make sure the backend server is running on port 8000
        </Typography>
      </Box>
    );
  }

  // Sidebar visibility logic: 
  // Desktop -> Show if onboarding is done 
  // Mobile -> Show ONLY if a company is selected (so map is visible first)
  const showSidebar = isMobile ? !!selectedCompany : completedOnboarding;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0A0E1A',
      }}
    >
      <Onboarding />

      {/* Map */}
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <MapComponent companies={companies} />
      </Box>

      {/* Filter Panel (Desktop only top-left, Mobile top center) */}
      {completedOnboarding && <FilterBar />}

      {/* Job Sidebar */}
      {showSidebar && <JobSidebar companies={companies} />}

      {/* Stats Bar */}
      {completedOnboarding && !isMobile && <StatsBar />}
    </Box>
  );
}
