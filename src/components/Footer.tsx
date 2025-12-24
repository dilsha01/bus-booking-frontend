import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1a2942', color: '#a0aec0', pt: 8, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              GENERAL
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                About
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
              <Link component={RouterLink} to="/blog" color="inherit" underline="hover">
                Blog
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Become Our Agent
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              HELPFUL RESOURCES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                FAQs
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Booking Guide
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Payment Guide
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Cancellation Policy
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              TOP ROUTES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Colombo - Kandy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Galle - Jaffna
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Negombo - Ella
              </Link>
              <Link component={RouterLink} to="/trips" color="inherit" underline="hover">
                View All →
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              CONTACT US
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
               Mihiranga Entreprises (PVT) LTD
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Halthota, Horana
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Hotline: +94 34 2252600
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Support: info@rideway.lk
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: '#a0aec0' }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: '#a0aec0' }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: '#a0aec0' }}>
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid #2d3748', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} BusGo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
