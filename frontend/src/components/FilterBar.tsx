'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Chip,
  Typography,
  InputAdornment,
  IconButton,
  Collapse,
  Button,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useStore } from '@/store/useStore';
import { useRoles } from '@/hooks/useCompanies';

export default function FilterBar() {
  const [showRoles, setShowRoles] = useState(true);
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const resetFilters = useStore((s) => s.resetFilters);
  const { data: rolesData, isLoading } = useRoles();

  const handleRoleToggle = (role: string) => {
    const newRoles = filters.roles.includes(role)
      ? filters.roles.filter((r) => r !== role)
      : [...filters.roles, role];
    setFilters({ roles: newRoles });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const activeFilterCount = filters.roles.length + (filters.search ? 1 : 0);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        right: { xs: 16, md: 'auto' },
        zIndex: 1000,
        width: { xs: 'calc(100% - 32px)', md: 420 },
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        background: 'rgba(17, 24, 39, 0.92)',
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        border: '1px solid rgba(108, 99, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}
          >
            📍
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              GeoJobs
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              Bengaluru · {activeFilterCount > 0 ? `${activeFilterCount} filters active` : 'Map-based job discovery'}
            </Typography>
          </Box>
          {activeFilterCount > 0 && (
            <IconButton
              size="small"
              onClick={resetFilters}
              sx={{ ml: 'auto', color: '#6C63FF' }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search jobs, companies..."
          value={filters.search}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: filters.search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setFilters({ search: '' })}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 2.5,
              fontSize: '0.875rem',
              '& fieldset': { borderColor: 'rgba(108, 99, 255, 0.2)' },
              '&:hover fieldset': { borderColor: 'rgba(108, 99, 255, 0.4)' },
              '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
            },
          }}
        />
      </Box>

      {/* Role Filters */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<FilterListIcon sx={{ fontSize: 16 }} />}
          onClick={() => setShowRoles(!showRoles)}
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            mb: 1,
            px: 1,
            '&:hover': { color: 'primary.main' },
          }}
        >
          Roles {filters.roles.length > 0 && `(${filters.roles.length})`}
        </Button>

        <Collapse in={showRoles}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={90}
                  height={28}
                  sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)' }}
                />
              ))
            ) : (
              rolesData?.roles.map((role) => {
                const isActive = filters.roles.includes(role);
                return (
                  <Chip
                    key={role}
                    label={role}
                    size="small"
                    onClick={() => handleRoleToggle(role)}
                    sx={{
                      fontSize: '0.75rem',
                      height: 28,
                      fontWeight: isActive ? 600 : 400,
                      background: isActive
                        ? 'linear-gradient(135deg, #6C63FF 0%, #4A42DB 100%)'
                        : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#fff' : 'text.secondary',
                      border: isActive
                        ? '1px solid rgba(108, 99, 255, 0.5)'
                        : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: isActive
                          ? 'linear-gradient(135deg, #7B73FF 0%, #5A52EB 100%)'
                          : 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  />
                );
              })
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
