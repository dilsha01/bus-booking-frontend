import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { tripService, busService, routeService } from '../../services/api';
import type { Trip, Bus, Route } from '../../services/api';

export default function ManageTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState({
    routeId: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    busId: '',
  });

  useEffect(() => {
    loadTrips();
    loadBuses();
    loadRoutes();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const response = await tripService.getAll();
      setTrips(response.data || []);
    } catch (error: any) {
      console.error('Failed to load trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const loadBuses = async () => {
    try {
      const response = await busService.getAll();
      setBuses(response.data || []);
    } catch (error: any) {
      console.error('Failed to load buses:', error);
      setBuses([]);
    }
  };

  const loadRoutes = async () => {
    try {
      const response = await routeService.getAll();
      setRoutes(response.data || []);
    } catch (error: any) {
      console.error('Failed to load routes:', error);
      setRoutes([]);
    }
  };

  const handleOpenDialog = (trip?: Trip) => {
    if (trip) {
      setEditingTrip(trip);
      // Convert UTC date to local datetime-local format
      const departureDate = new Date(trip.departureTime);
      const arrivalDate = new Date(trip.arrivalTime);
      
      // Format as YYYY-MM-DDTHH:mm for datetime-local input
      const formatForInput = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
      
      setFormData({
        routeId: trip.routeId ? String(trip.routeId) : '',
        departureTime: formatForInput(departureDate),
        arrivalTime: formatForInput(arrivalDate),
        price: trip.price,
        busId: trip.busId.toString(),
      });
    } else {
      setEditingTrip(null);
      setFormData({
        routeId: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        busId: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTrip(null);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.routeId) {
        alert('Please select a route');
        return;
      }

      const selectedRoute = routes.find((r) => r.id === Number(formData.routeId));
      if (!selectedRoute) {
        alert('Selected route not found');
        return;
      }

      const data: any = {
        origin: selectedRoute.origin,
        destination: selectedRoute.destination,
        routeNumber: selectedRoute.routeNumber,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        price: formData.price,
        // inherit sections/stops from the selected route definition
        stops: selectedRoute.stops,
        routeId: selectedRoute.id,
        busId: parseInt(formData.busId),
      };
      
      if (editingTrip) {
        await tripService.update(editingTrip.id, data);
      } else {
        await tripService.create(data as any);
      }
      handleCloseDialog();
      loadTrips();
    } catch (error: any) {
      console.error('Failed to save trip:', error);
      alert(error.response?.data?.message || 'Failed to save trip');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await tripService.delete(id);
        loadTrips();
      } catch (error: any) {
        console.error('Failed to delete trip:', error);
        alert(error.response?.data?.message || 'Failed to delete trip');
      }
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-LK', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Manage Trips
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Trip
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Route No</strong></TableCell>
              <TableCell><strong>Route</strong></TableCell>
              <TableCell><strong>Bus (Type)</strong></TableCell>
              <TableCell><strong>Departure</strong></TableCell>
              <TableCell><strong>Arrival</strong></TableCell>
              <TableCell><strong>Price (LKR)</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.id}</TableCell>
                <TableCell>{trip.routeNumber}</TableCell>
                <TableCell>
                  {trip.origin} → {trip.destination}
                </TableCell>
                <TableCell>
                  {trip.Bus?.name || 'N/A'}
                  {trip.Bus?.type && ` (${trip.Bus.type})`}
                </TableCell>
                <TableCell>{formatDateTime(trip.departureTime)}</TableCell>
                <TableCell>{formatDateTime(trip.arrivalTime)}</TableCell>
                <TableCell>{parseFloat(trip.price).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(trip)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(trip.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingTrip ? 'Edit Trip' : 'Add New Trip'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12}>
              <TextField
                select
                label="Route"
                fullWidth
                value={formData.routeId}
                onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
                helperText="Select an existing route defined under Manage Routes"
              >
                {routes.map((route) => (
                  <MenuItem key={route.id} value={route.id}>
                    {route.routeNumber}  {route.origin}  {route.destination}
                    {route.category ? ` (${route.category})` : ''}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Departure Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Arrival Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price (LKR)"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Bus"
                fullWidth
                value={formData.busId}
                onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
              >
                {buses.map((bus) => (
                  <MenuItem key={bus.id} value={bus.id}>
                    {bus.numberPlate} {bus.type ? `(${bus.type})` : ''}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTrip ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
