'use client';

import {
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Divider,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useStore } from '@/store/useStore';
import { Company } from '@/types';

const COMPANY_COLORS: Record<string, string> = {
  Google: '#4285F4', Amazon: '#FF9900', Microsoft: '#00A4EF',
  Cisco: '#049FD9', Flipkart: '#F7D516', Intuit: '#365EBF',
  IBM: '#054ADA', Oracle: '#F80000', SAP: '#0FAAFF',
  PayPal: '#003087', Apple: '#A2AAAD', Adobe: '#FF0000',
  Walmart: '#0071CE', Intel: '#0071C5', Nvidia: '#76B900',
  Qualcomm: '#3253DC', Freshworks: '#F36C21', Swiggy: '#FC8019',
  Zomato: '#E23744', Razorpay: '#2B84EA',
};

function getCompanyColor(name: string): string {
  return COMPANY_COLORS[name] || `hsl(${(name.charCodeAt(0) * 37) % 360}, 70%, 55%)`;
}

interface JobSidebarProps {
  companies: Company[];
}

export default function JobSidebar({ companies }: JobSidebarProps) {
  const selectedCompany = useStore((s) => s.selectedCompany);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const setSelectedCompany = useStore((s) => s.setSelectedCompany);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);

  const totalJobs = companies.reduce((sum, c) => sum + c.jobs.length, 0);

  return (
    <Slide direction="left" in={true} mountOnEnter>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bottom: 16,
          width: { xs: 'calc(100% - 32px)', md: 380 },
          zIndex: 1000,
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: '1px solid rgba(108, 99, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(0, 217, 255, 0.05) 100%)',
            borderBottom: '1px solid rgba(108, 99, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>
                {selectedCompany ? selectedCompany.name : 'All Companies'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {selectedCompany
                  ? `${selectedCompany.jobs.length} open position${selectedCompany.jobs.length > 1 ? 's' : ''}`
                  : `${companies.length} companies · ${totalJobs} jobs`}
              </Typography>
            </Box>
            {selectedCompany && (
              <IconButton
                size="small"
                onClick={() => setSelectedCompany(null)}
                sx={{ color: 'text.secondary' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Jobs List */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 1.5,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(108, 99, 255, 0.3)',
              borderRadius: 2,
            },
          }}
        >
          {(selectedCompany ? [selectedCompany] : companies).map((company) => (
            <Box key={company.id} sx={{ mb: 2 }}>
              {!selectedCompany && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    px: 0.5,
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                  }}
                  onClick={() => setSelectedCompany(company)}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 1.5,
                      background: getCompanyColor(company.name),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    {company.name.charAt(0)}
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.primary' }}
                  >
                    {company.name}
                  </Typography>
                  <Chip
                    label={`${company.jobs.length}`}
                    size="small"
                    sx={{
                      ml: 'auto',
                      height: 20,
                      fontSize: '0.65rem',
                      background: 'rgba(108, 99, 255, 0.15)',
                      color: '#6C63FF',
                    }}
                  />
                </Box>
              )}

              {company.jobs.map((job) => {
                const color = getCompanyColor(company.name);
                return (
                  <Box
                    key={job.id}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.06)',
                        borderColor: `${color}33`,
                        transform: 'translateX(-2px)',
                      },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.primary', mb: 0.5 }}
                    >
                      {job.title}
                    </Typography>

                    {selectedCompany && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 0.5,
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', fontSize: '0.7rem' }}
                        >
                          {company.address}
                        </Typography>
                      </Box>
                    )}

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 0.75,
                        mb: 1,
                      }}
                    >
                      <Chip
                        icon={<WorkIcon sx={{ fontSize: '12px !important' }} />}
                        label={job.role_category}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.65rem',
                          background: `${color}15`,
                          color: color,
                          border: `1px solid ${color}30`,
                          '& .MuiChip-icon': { color: color },
                        }}
                      />
                      <Chip
                        icon={<AccessTimeIcon sx={{ fontSize: '12px !important' }} />}
                        label={job.posted_on}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.65rem',
                          background: 'rgba(255,255,255,0.04)',
                          color: 'text.secondary',
                          '& .MuiChip-icon': { color: 'inherit' },
                        }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      sx={{
                        background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        py: 0.6,
                        boxShadow: `0 4px 14px ${color}40`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${color}DD 0%, ${color} 100%)`,
                          boxShadow: `0 6px 20px ${color}60`,
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                );
              })}

              {!selectedCompany && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', my: 1 }} />}
            </Box>
          ))}

          {companies.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
                opacity: 0.5,
              }}
            >
              <WorkIcon sx={{ fontSize: 48, mb: 1, color: 'text.secondary' }} />
              <Typography variant="body2">No jobs found</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Try adjusting your filters
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer Stats */}
        <Box
          sx={{
            p: 1.5,
            borderTop: '1px solid rgba(108, 99, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            📍 Bengaluru, India
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            {totalJobs} jobs available
          </Typography>
        </Box>
      </Box>
    </Slide>
  );
}
