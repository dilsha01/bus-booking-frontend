import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, DirectionsBus } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to bottom, #102a43 0%, #0b1728 100%)',
        color: '#a0aec0',
        pt: { xs: 8, md: 10 },
        pb: 6,
        borderTop: '1px solid #1e3a52',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Brand row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            gap: 2,
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a4d7a, #0f3554)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(26, 77, 122, 0.4)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                },
              }}
            >
              <DirectionsBus sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  letterSpacing: 0.5,
                  mb: 0.5,
                }}
              >
                BusGo
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 280 }}>
                Seamless intercity bus bookings across Sri Lanka.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Link columns */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ 
                color: 'white', 
                fontWeight: 600, 
                mb: 2.5, 
                letterSpacing: 0.5,
                fontSize: '0.95rem',
              }}
            >
              GENERAL
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                About
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Contact Us
              </Link>
              <Link
                component={RouterLink}
                to="/blog"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Become Our Agent
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ 
                color: 'white', 
                fontWeight: 600, 
                mb: 2.5, 
                letterSpacing: 0.5,
                fontSize: '0.95rem',
              }}
            >
              HELPFUL RESOURCES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                FAQs
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Booking Guide
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Payment Guide
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Cancellation Policy
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ 
                color: 'white', 
                fontWeight: 600, 
                mb: 2.5, 
                letterSpacing: 0.5,
                fontSize: '0.95rem',
              }}
            >
              TOP ROUTES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Colombo - Kandy
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Galle - Jaffna
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                Negombo - Ella
              </Link>
              <Link
                component={RouterLink}
                to="/trips"
                color="inherit"
                underline="none"
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#ffffff',
                    pl: 1,
                  },
                }}
              >
                View All →
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ 
                color: 'white', 
                fontWeight: 600, 
                mb: 2.5, 
                letterSpacing: 0.5,
                fontSize: '0.95rem',
              }}
            >
              CONTACT US
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Mihiranga Entreprises (PVT) LTD
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Halthota, Horana
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Hotline: +94 34 2252600
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Support: info@rideway.lk
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
              <IconButton 
                size="small" 
                aria-label="Facebook"
                sx={{ 
                  color: '#94a3b8',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#3b82f6',
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="Instagram"
                sx={{ 
                  color: '#94a3b8',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#ec4899',
                    borderColor: '#ec4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="Twitter"
                sx={{ 
                  color: '#94a3b8',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#0ea5e9',
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box
          sx={{
            borderTop: '1px solid #2d3748',
            mt: 6,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} BusGo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
