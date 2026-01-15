// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Divider,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import { DirectionsBus, Person, EventSeat } from '@mui/icons-material';
// import { tripService, bookingService } from '../services/api';
// import { useAuth } from '../hooks/useAuth';
// import type { Trip } from '../services/api';

// export default function Booking() {
//   const { tripId } = useParams<{ tripId: string }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [trip, setTrip] = useState<Trip | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     seats: 1,
//     userId: user?.id || 0, // Use logged-in user's ID
//   });

//   useEffect(() => {
//     loadTrip();
//   }, [tripId]);

//   const loadTrip = async () => {
//     if (!tripId) {
//       setError('Invalid trip ID');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await tripService.getById(Number(tripId));
//       if (response.data) {
//         setTrip(response.data);
//         setError('');
//       } else {
//         setError('Trip not found');
//       }
//     } catch (err: any) {
//       console.error('Failed to load trip:', err);
//       const errorMessage = err.response?.data?.message || 'Failed to load trip details';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!trip || !user?.id) return;

//     try {
//       setSubmitting(true);
//       setError('');
//       const response = await bookingService.create({
//         userId: user.id,
//         tripId: trip.id,
//         seats: formData.seats,
//       });
      
//       if (response.data) {
//         setSuccess(true);
//         setTimeout(() => navigate('/'), 3000);
//       }
//     } catch (err: any) {
//       console.error('Failed to create booking:', err);
//       const errorMessage = err.response?.data?.message || 'Failed to create booking';
//       setError(errorMessage);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatTime = (dateString: string) => {
//     return new Date(dateString).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!trip) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 12, py: 6 }}>
//         <Alert severity="error">{error || 'Trip not found'}</Alert>
//         <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3 }}>
//           Back to Home
//         </Button>
//       </Container>
//     );
//   }

//   const totalPrice = parseFloat(trip.price) * formData.seats;

//   return (
//     <Box sx={{ mt: 10, py: 6, minHeight: '80vh', backgroundColor: 'background.default' }}>
//       <Container maxWidth="lg">
//         <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
//           Complete Your Booking
//         </Typography>

//         {success && (
//           <Alert severity="success" sx={{ mb: 3 }}>
//             Booking confirmed! Redirecting to home page...
//           </Alert>
//         )}

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={8}>
//             <Card>
//               <CardContent sx={{ p: 4 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
//                   Passenger Information
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                   <Grid container spacing={3}>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         label="Full Name"
//                         required
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         InputProps={{ startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} /> }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Email"
//                         type="email"
//                         required
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                       <TextField
//                         fullWidth
//                         label="Phone Number"
//                         required
//                         value={formData.phone}
//                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         label="Number of Seats"
//                         type="number"
//                         required
//                         value={formData.seats}
//                         onChange={(e) =>
//                           setFormData({ ...formData, seats: Math.max(1, parseInt(e.target.value) || 1) })
//                         }
//                         inputProps={{ min: 1, max: trip.Bus?.totalSeats || 50 }}
//                         InputProps={{ startAdornment: <EventSeat sx={{ mr: 1, color: 'text.secondary' }} /> }}
//                       />
//                     </Grid>
//                   </Grid>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     fullWidth
//                     disabled={submitting}
//                     sx={{ mt: 4 }}
//                   >
//                     {submitting ? <CircularProgress size={24} /> : `Confirm Booking - LKR ${totalPrice.toFixed(2)}`}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Paper 
//               elevation={3}
//               sx={{ 
//                 p: 3.5, 
//                 position: 'sticky', 
//                 top: 100,
//                 borderRadius: 3,
//                 border: '2px solid',
//                 borderColor: 'primary.light',
//                 background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
//                 Trip Summary
//               </Typography>
//               <Divider sx={{ mb: 3 }} />

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <DirectionsBus color="primary" />
//                 <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                   {trip.Bus?.name || 'Express Bus'}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Route
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                   {trip.origin} → {trip.destination}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Date
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                   {formatDate(trip.departureTime)}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Departure
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                   {formatTime(trip.departureTime)}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Arrival
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                   {formatTime(trip.arrivalTime)}
//                 </Typography>
//               </Box>

//               <Divider sx={{ my: 2 }} />

//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                 <Typography variant="body2">Price per seat</Typography>
//                 <Typography variant="body2">LKR {parseFloat(trip.price).toFixed(2)}</Typography>
//               </Box>

//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                 <Typography variant="body2">Seats</Typography>
//                 <Typography variant="body2">{formData.seats}</Typography>
//               </Box>

//               <Divider sx={{ my: 2 }} />

//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                   Total
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
//                   LKR {totalPrice.toFixed(2)}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
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
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { DirectionsBus, Person, EventSeat } from '@mui/icons-material';
import { tripService, bookingService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import type { Trip } from '../services/api';

export default function Booking() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
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
    userId: user?.id || 0, // Use logged-in user's ID
    startStop: '',
    endStop: '',
  });

  useEffect(() => {
    loadTrip();
    // We intentionally only refetch when tripId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // Pre-select full route as default section
        const stops = Array.isArray(response.data.stops) ? response.data.stops : [];
        if (stops.length >= 2) {
          setFormData((prev) => ({
            ...prev,
            startStop: stops[0],
            endStop: stops[stops.length - 1],
          }));
        }
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
    if (!trip || !user?.id) return;

    try {
      setSubmitting(true);
      setError('');
      const response = await bookingService.create({
        userId: user.id,
        tripId: trip.id,
        seats: formData.seats,
        startStop: formData.startStop,
        endStop: formData.endStop,
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

  const formatLKR = (value: number) =>
    `LKR ${value.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const calculateSectionPricePerSeat = () => {
    if (!trip || !Array.isArray(trip.stops) || trip.stops.length < 2) {
      return parseFloat(trip?.price || '0');
    }

    const stops = trip.stops;
    const fromIndex = stops.findIndex((s) => s === formData.startStop);
    const toIndex = stops.findIndex((s) => s === formData.endStop);

    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      return parseFloat(trip.price);
    }

    const fullSegments = stops.length - 1;
    const basePrice = parseFloat(trip.price); // full route price per seat
    const pricePerSegment = fullSegments > 0 ? basePrice / fullSegments : basePrice;
    const segmentCount = toIndex - fromIndex;
    return pricePerSegment * segmentCount;
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

  const pricePerSeatForSection = calculateSectionPricePerSeat();
  const totalPrice = pricePerSeatForSection * formData.seats;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 5, md: 7 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: -0.4,
              mb: 0.75,
              fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' },
            }}
          >
            Complete Your Booking
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Review your trip details and confirm your seat reservation.
          </Typography>
        </Box>

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

        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
          {/* Left: Form */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={10}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 18px 55px rgba(15, 23, 42, 0.10)',
              }}
            >
              <Box
                sx={{
                  px: { xs: 3, sm: 4 },
                  py: 2.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(90deg, rgba(37,99,235,0.10), rgba(249,115,22,0.08))',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Passenger Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Please provide your details exactly as they appear on your ID.
                </Typography>
              </Box>

              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
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

                    {Array.isArray(trip.stops) && trip.stops.length >= 2 && (
                      <>
                        <Grid item xs={12} md={6}>
                          <TextField
                            select
                            fullWidth
                            label="Boarding Point (From)"
                            value={formData.startStop}
                            onChange={(e) => setFormData({ ...formData, startStop: e.target.value })}
                          >
                            {trip.stops.map((stop) => (
                              <MenuItem key={stop} value={stop}>
                                {stop}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            select
                            fullWidth
                            label="Drop-off Point (To)"
                            value={formData.endStop}
                            onChange={(e) => setFormData({ ...formData, endStop: e.target.value })}
                          >
                            {trip.stops.map((stop) => (
                              <MenuItem key={stop} value={stop}>
                                {stop}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </>
                    )}

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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventSeat sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
                        Available seats: {trip.Bus?.totalSeats ?? 50}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    sx={{
                      mt: 3,
                      py: 1.35,
                      fontWeight: 800,
                      borderRadius: 2.5,
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {submitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      `Confirm Booking - ${formatLKR(totalPrice)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={10}
              sx={{
                p: 3.5,
                borderRadius: 4,
                position: { md: 'sticky' },
                top: 96,
                boxShadow: '0 18px 55px rgba(15, 23, 42, 0.10)',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  background: 'linear-gradient(90deg, #2563eb, #f97316)',
                  opacity: 0.9,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  mb: 2.25,
                  color: 'primary.main',
                  letterSpacing: -0.2,
                }}
              >
                Trip Summary
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
                <DirectionsBus color="primary" />
                <Typography variant="body1" sx={{ fontWeight: 800 }}>
                  {trip.Bus?.name || 'Express Bus'}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2.25 }} />

              <Box sx={{ display: 'grid', gap: 1.75 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Route
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {trip.origin} → {trip.destination} (Route {trip.routeNumber})
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {formatDate(trip.departureTime)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Departure
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {formatTime(trip.departureTime)}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Arrival
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {formatTime(trip.arrivalTime)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2.25 }} />

              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Price per seat (selected section)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {formatLKR(pricePerSeatForSection)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Seats
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {formData.seats}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2.25 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="body1" sx={{ fontWeight: 900 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'secondary.main' }}>
                  {formatLKR(totalPrice)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
