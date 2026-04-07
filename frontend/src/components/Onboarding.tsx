'use client';

import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Fade,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { useStore } from '@/store/useStore';
import { useRoles } from '@/hooks/useCompanies';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';

export default function Onboarding() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const completedOnboarding = useStore((s) => s.completedOnboarding);
  const setCompletedOnboarding = useStore((s) => s.setCompletedOnboarding);
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const { data: rolesData, isLoading } = useRoles();

  if (completedOnboarding) return null;

  const handleRoleSelect = (role: string) => {
    setFilters({ roles: [role] });
  };

  const handleFinish = () => {
    setCompletedOnboarding(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        background: 'radial-gradient(circle at center, #111827 0%, #0A0E1A 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <Fade in={true} timeout={800}>
        <Box sx={{ maxWidth: 500, width: '100%' }}>
          {/* Logo/Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 32px',
              boxShadow: '0 0 40px rgba(108, 99, 255, 0.4)',
              animation: 'pulse 3s infinite',
            }}
          >
            📍
          </Box>

          <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>
            Welcome to <span style={{ color: '#6C63FF' }}>GeoJobs</span>
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, color: 'text.secondary' }}>
            Discover tech jobs visually on the map. To get started, what roles are you interested in?
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mb: 6 }}>
            {isLoading ? (
              <CircularProgress size={32} />
            ) : (
              rolesData?.roles.map((role) => {
                const isActive = filters.roles.includes(role);
                return (
                  <Chip
                    key={role}
                    icon={isActive ? <SearchIcon sx={{ fontSize: '14px !important' }} /> : <WorkIcon sx={{ fontSize: '14px !important' }} />}
                    label={role}
                    onClick={() => handleRoleSelect(role)}
                    sx={{
                      py: 3,
                      px: 1,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      background: isActive 
                        ? 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#fff' : 'text.primary',
                      border: '1px solid',
                      borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.1)',
                      '&:hover': {
                         background: isActive 
                          ? 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)' 
                          : 'rgba(255,255,255,0.1)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                );
              })
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth={isMobile}
            onClick={handleFinish}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.1rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6C63FF 0%, #4A42DB 100%)',
              boxShadow: '0 8px 30px rgba(108, 99, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(108, 99, 255, 0.4)',
              },
            }}
          >
            Open the Map
          </Button>

          <Button
            variant="text"
            onClick={handleFinish}
            sx={{ mt: 2, color: 'text.secondary', fontSize: '0.9rem' }}
          >
            I want to see all jobs first
          </Button>
        </Box>
      </Fade>
    </div>
  );
}
