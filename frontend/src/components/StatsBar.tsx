'use client';

import { Box, Typography, CircularProgress } from '@mui/material';
import { useCompanies } from '@/hooks/useCompanies';

export default function StatsBar() {
  const { data, isLoading } = useCompanies();
  
  const companies = data?.results || [];
  const totalJobs = companies.reduce((sum, c) => sum + c.jobs.length, 0);
  const roles = new Set(companies.flatMap((c) => c.jobs.map((j) => j.role_category)));

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(16px)',
          borderRadius: 3,
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          border: '1px solid rgba(108, 99, 255, 0.15)',
        }}
      >
        <CircularProgress size={16} sx={{ color: '#6C63FF' }} />
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Loading jobs...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(17, 24, 39, 0.9)',
        backdropFilter: 'blur(16px)',
        borderRadius: 3,
        px: 2.5,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        border: '1px solid rgba(108, 99, 255, 0.15)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <StatItem value={companies.length} label="Companies" color="#6C63FF" />
      <Box sx={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />
      <StatItem value={totalJobs} label="Open Jobs" color="#00D9FF" />
      <Box sx={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />
      <StatItem value={roles.size} label="Categories" color="#76B900" />
    </Box>
  );
}

function StatItem({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontSize: '0.65rem', lineHeight: 1 }}
      >
        {label}
      </Typography>
    </Box>
  );
}
