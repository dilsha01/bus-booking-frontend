import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Grid,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const cities = [
  'Colombo',
  'Kandy',
  'Galle',
  'Jaffna',
  'Negombo',
  'Anuradhapura',
  'Trincomalee',
  'Ella',
  'Nuwara Eliya',
  'Matara',
];

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleSearch = () => {
    if (searchParams.from && searchParams.to) {
      navigate(
        `/trips?from=${searchParams.from}&to=${searchParams.to}&date=${searchParams.date || ''}`
      );
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          minHeight: '600px',
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', color: 'white', mb: 6 }}>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              BOOK NOW
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              FOR A SEAMLESS JOURNEY
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95, fontWeight: 400 }}>
              Effortless travel starts with our trusted service
            </Typography>
          </Box>

          {/* Search Card */}
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="From"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                  sx={{ backgroundColor: 'white' }}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="To"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                  sx={{ backgroundColor: 'white' }}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Search />}
                  onClick={handleSearch}
                  sx={{
                    height: '56px',
                    fontSize: '1.1rem',
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}
            >
              Convenient payments with all major cards and methods.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#0f3554', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ textAlign: 'center', color: 'white' }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                15,000+
              </Typography>
              <Typography variant="h6">Happy Customers</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                250+
              </Typography>
              <Typography variant="h6">Daily Routes</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                24/7
              </Typography>
              <Typography variant="h6">Customer Support</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
            Why Choose RideWay?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Easy Booking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Book your journey in just a few clicks with our simple and intuitive platform.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Secure Payments
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Multiple payment options with industry-standard security for peace of mind.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Reliable Service
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Partner with trusted bus operators across Sri Lanka for quality journeys.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
