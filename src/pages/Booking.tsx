import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DirectionsBus, Person, EventSeat } from '@mui/icons-material';
import { tripService, bookingService } from '../services/api';
import type { Trip } from '../services/api';

export default function Booking() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    seats: 1,
    userId: 1, // Temporary hardcoded user ID
  });

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  const loadTrip = async () => {
    if (!tripId) {
      setError('Invalid trip ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await tripService.getById(Number(tripId));
      if (response.data) {
        setTrip(response.data);
        setError('');
      } else {
        setError('Trip not found');
      }
    } catch (err: any) {
      console.error('Failed to load trip:', err);
      const errorMessage = err.response?.data?.message || 'Failed to load trip details';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trip) return;

    try {
      setSubmitting(true);
      setError('');
      const response = await bookingService.create({
        userId: formData.userId,
        tripId: trip.id,
        seats: formData.seats,
      });
      
      if (response.data) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err: any) {
      console.error('Failed to create booking:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create booking';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!trip) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, py: 6 }}>
        <Alert severity="error">{error || 'Trip not found'}</Alert>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const totalPrice = parseFloat(trip.price) * formData.seats;

  return (
    <Box sx={{ mt: 10, py: 6, minHeight: '80vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Complete Your Booking
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Booking confirmed! Redirecting to home page...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Passenger Information
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        InputProps={{ startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} /> }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Number of Seats"
                        type="number"
                        required
                        value={formData.seats}
                        onChange={(e) =>
                          setFormData({ ...formData, seats: Math.max(1, parseInt(e.target.value) || 1) })
                        }
                        inputProps={{ min: 1, max: trip.Bus?.totalSeats || 50 }}
                        InputProps={{ startAdornment: <EventSeat sx={{ mr: 1, color: 'text.secondary' }} /> }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    sx={{ mt: 4 }}
                  >
                    {submitting ? <CircularProgress size={24} /> : `Confirm Booking - LKR ${totalPrice.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3.5, 
                position: 'sticky', 
                top: 100,
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'primary.light',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                Trip Summary
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <DirectionsBus color="primary" />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {trip.Bus?.name || 'Express Bus'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Route
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {trip.origin} → {trip.destination}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatDate(trip.departureTime)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Departure
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatTime(trip.departureTime)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Arrival
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatTime(trip.arrivalTime)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Price per seat</Typography>
                <Typography variant="body2">LKR {parseFloat(trip.price).toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Seats</Typography>
                <Typography variant="body2">{formData.seats}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  LKR {totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
