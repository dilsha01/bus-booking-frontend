import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Paper,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  CalendarMonth,
  LocationOn,
  Search,
  SwapHoriz,
} from '@mui/icons-material';
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
          minHeight: '650px',
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
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              mb: 6,
            }}
          >
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              BOOK NOW
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              FOR A SEAMLESS JOURNEY
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.95,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Effortless travel across Sri Lanka with real-time availability,
              secure payments, and trusted operators.
            </Typography>
          </Box>

          {/* Search Card */}
          <Paper
            elevation={0}
            sx={{
              px: { xs: 2.5, md: 4 },
              py: { xs: 2.5, md: 3 },
              // Use a softer radius on mobile so it doesn't look like a circle
              borderRadius: { xs: 4, sm: 6, md: 6 },
              backgroundColor: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: { xs: 3, md: 6 },
              maxWidth: 1040,
              mx: 'auto',
            }}
          >
            <Grid
              container
              alignItems="center"
              spacing={{ xs: 2, md: 0 }}
              sx={{
                flexWrap: { xs: 'wrap', md: 'nowrap' },
              }}
            >
              <Grid
                xs={12}
                md={4}
                sx={{
                  borderRight: { md: 1 },
                  borderColor: 'divider',
                  pr: { md: 2.5 },
                }}
              >
                <TextField
                  select
                  fullWidth
                  label="From"
                  value={searchParams.from}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, from: e.target.value })
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <Typography component="span" color="text.secondary">
                            Select city
                          </Typography>
                        );
                      }
                      return Array.isArray(selected)
                        ? selected.join(', ')
                        : String(selected);
                    },
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontWeight: 600,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 56,
                      borderRadius: { xs: 3, md: 9999 },
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid
                xs={12}
                md={4}
                sx={{
                  borderRight: { md: 1 },
                  borderColor: 'divider',
                  px: { md: 2.5 },
                  mt: { xs: 1.5, md: 0 },
                }}
              >
                <TextField
                  select
                  fullWidth
                  label="To"
                  value={searchParams.to}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, to: e.target.value })
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SwapHoriz fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <Typography component="span" color="text.secondary">
                            Select city
                          </Typography>
                        );
                      }
                      return Array.isArray(selected)
                        ? selected.join(', ')
                        : String(selected);
                    },
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontWeight: 600,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 56,
                      borderRadius: { xs: 3, md: 9999 },
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid
                xs={12}
                md={2}
                sx={{
                  px: { md: 2.5 },
                  mt: { xs: 1.5, md: 0 },
                }}
              >
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={searchParams.date}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, date: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontWeight: 600,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 56,
                      borderRadius: { xs: 3, md: 9999 },
                      backgroundColor: 'background.default',
                    },
                  }}
                />
              </Grid>

              <Grid
                xs={12}
                md={2}
                sx={{
                  mt: { xs: 2, md: 0 },
                  pl: { md: 2.5 },
                  display: 'flex',
                  justifyContent: { xs: 'stretch', md: 'center' },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Search />}
                  onClick={handleSearch}
                  sx={{
                    height: 56,
                    px: 5,
                    fontSize: '1.05rem',
                    borderRadius: { xs: 3, md: 9999 },
                    boxShadow: 3,
                    textTransform: 'none',
                    fontWeight: 700,
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      boxShadow: 5,
                    },
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
              Convenient payments with all major cards and methods. No extra
              booking charges.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#0f3554', py: 8 }}>
        <Container maxWidth="md">
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
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center', maxWidth: 420, mx: 'auto' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Easy Booking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Book your journey in just a few clicks with our simple and intuitive platform.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center', maxWidth: 420, mx: 'auto' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                  Secure Payments
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Multiple payment options with industry-standard security for peace of mind.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center', maxWidth: 420, mx: 'auto' }}>
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

      {/* How it works Section */}
      <Box sx={{ py: 10, backgroundColor: '#0f3554' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ textAlign: 'center', mb: 6, fontWeight: 700, color: 'white' }}
          >
            Plan Your Trip in 3 Steps
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: 'white',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  1
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Search Routes
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Enter your departure, destination and travel date to see
                  available buses instantly.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: 'white',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  2
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Choose Your Bus
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Compare timings, prices and seat availability to pick the
                  perfect ride.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: 'white',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  3
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Book & Travel
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Pay securely online, receive instant confirmation and enjoy a
                  smooth journey.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
