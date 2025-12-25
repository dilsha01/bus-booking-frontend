import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DirectionsBus, Schedule, AttachMoney } from '@mui/icons-material';
import { tripService } from '../services/api';
import type { Trip } from '../services/api';

export default function Trips() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  useEffect(() => {
    loadTrips();
  }, [from, to, date]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      // Use API query parameters for filtering
      const response = await tripService.getAll({
        origin: from || undefined,
        destination: to || undefined,
        date: date || undefined,
      });
      
      setTrips(response.data || []);
    } catch (error: any) {
      console.error('Failed to load trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Box sx={{ mt: 8, pt: 6, pb: 10, minHeight: '80vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              background: 'linear-gradient(135deg, #1a4d7a 0%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Available Journeys
          </Typography>
          {(from || to) && (
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
              {from && to ? `${from} → ${to}` : from || to}
              {date && ` on ${formatDate(date)}`}
            </Typography>
          )}
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : trips.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No trips found. Try different search criteria.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ mt: 3 }}
              >
                Back to Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item xs={12} key={trip.id}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 8,
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <DirectionsBus color="primary" />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {trip.Bus?.name || 'Express Bus'}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {trip.Bus?.totalSeats} seats
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {formatTime(trip.departureTime)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {trip.origin}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            →
                          </Typography>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {formatTime(trip.arrivalTime)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {trip.destination}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}
                        >
                          <Schedule fontSize="small" />
                          {formatDate(trip.departureTime)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <Chip
                          icon={<AttachMoney />}
                          label={`LKR ${parseFloat(trip.price).toFixed(2)}`}
                          color="secondary"
                          sx={{ fontWeight: 600, fontSize: '1rem' }}
                        />
                      </Grid>

                      <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => navigate(`/booking/${trip.id}`)}
                          fullWidth
                        >
                          Book Now
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
