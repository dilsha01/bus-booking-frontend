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
import {
  CalendarMonth,
  KeyboardArrowDown,
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
            elevation={6}
            sx={{
              px: { xs: 2.5, md: 4 },
              py: { xs: 2.5, md: 3 },
              borderRadius: 9999,
              backgroundColor: '#ffffff',
              boxShadow: '0 22px 55px rgba(15, 23, 42, 0.6)',
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
                item
                xs={12}
                md={4}
                sx={{
                  borderRight: { md: '1px solid rgba(148, 163, 184, 0.3)' },
                  pr: { md: 2.5 },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5, display: 'block' }}
                >
                  From
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 44,
                      borderRadius: '9999px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'primary.main',
                      backgroundColor: '#f9fafb',
                      px: 1,
                    }}
                  >
                    <LocationOn fontSize="small" />
                    <KeyboardArrowDown fontSize="small" />
                  </Box>
                  <TextField
                    select
                    fullWidth
                    value={searchParams.from}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, from: e.target.value })
                    }
                    placeholder="Leaving from"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected) => {
                        if (!selected) {
                          return <span style={{ color: '#9ca3af' }}>Select city</span>;
                        }
                        return selected;
                      },
                    }}
                    sx={{
                      '& .MuiSelect-select': {
                        py: 1.2,
                        fontSize: '0.95rem',
                      },
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  borderRight: { md: '1px solid rgba(148, 163, 184, 0.3)' },
                  px: { md: 2.5 },
                  mt: { xs: 1.5, md: 0 },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5, display: 'block' }}
                >
                  To
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 44,
                      borderRadius: '9999px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'primary.main',
                      backgroundColor: '#f9fafb',
                      px: 1,
                    }}
                  >
                    <SwapHoriz fontSize="small" />
                    <KeyboardArrowDown fontSize="small" />
                  </Box>
                  <TextField
                    select
                    fullWidth
                    value={searchParams.to}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, to: e.target.value })
                    }
                    placeholder="Going to"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected) => {
                        if (!selected) {
                          return <span style={{ color: '#9ca3af' }}>Select city</span>;
                        }
                        return selected;
                      },
                    }}
                    sx={{
                      '& .MuiSelect-select': {
                        py: 1.2,
                        fontSize: '0.95rem',
                      },
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  px: { md: 2.5 },
                  mt: { xs: 1.5, md: 0 },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5, display: 'block' }}
                >
                  Date
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 44,
                      borderRadius: '9999px',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'primary.main',
                      backgroundColor: '#f9fafb',
                      px: 1,
                    }}
                  >
                    <CalendarMonth fontSize="small" />
                    <KeyboardArrowDown fontSize="small" />
                  </Box>
                  <TextField
                    fullWidth
                    type="date"
                    value={searchParams.date}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, date: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    InputProps={{ 
                      disableUnderline: true,
                    }}
                    sx={{
                      '& input': {
                        py: 1.2,
                        fontSize: '0.95rem',
                      },
                      '& input::-webkit-calendar-picker-indicator': {
                        cursor: 'pointer',
                        opacity: 0.6,
                        '&:hover': {
                          opacity: 1,
                        },
                      },
                      '& input[type="date"]:not(:focus):not(:valid)': {
                        color: 'transparent',
                      },
                      '& input[type="date"]:not(:focus):not(:valid)::before': {
                        content: '"dd/mm/yyyy"',
                        color: '#9ca3af',
                      },
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                item
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
                    borderRadius: 9999,
                    background: 'linear-gradient(135deg, #0f4c81, #1d7ad8)',
                    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.6)',
                    textTransform: 'none',
                    fontWeight: 600,
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0b3458, #165fa9)',
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

      {/* How it works Section */}
      <Box sx={{ py: 10, backgroundColor: '#0f3554' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ textAlign: 'center', mb: 6, fontWeight: 700, color: 'white' }}
          >
            Plan Your Trip in 3 Steps
          </Typography>
          <Grid container spacing={4}>
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
