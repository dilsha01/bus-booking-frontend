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
import { tripService, busService } from '../../services/api';
import type { Trip, Bus } from '../../services/api';

export default function ManageTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    busId: '',
  });

  useEffect(() => {
    loadTrips();
    loadBuses();
  }, []);

  const loadTrips = async () => {
    try {
      const response = await tripService.getAll();
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBuses = async () => {
    try {
      const response = await busService.getAll();
      setBuses(response.data);
    } catch (error) {
      console.error('Failed to load buses:', error);
    }
  };

  const handleOpenDialog = (trip?: Trip) => {
    if (trip) {
      setEditingTrip(trip);
      setFormData({
        origin: trip.origin,
        destination: trip.destination,
        departureTime: trip.departureTime.substring(0, 16),
        arrivalTime: trip.arrivalTime.substring(0, 16),
        price: trip.price,
        busId: trip.busId.toString(),
      });
    } else {
      setEditingTrip(null);
      setFormData({
        origin: '',
        destination: '',
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
      const data = {
        ...formData,
        busId: parseInt(formData.busId),
        price: formData.price,
      };
      if (editingTrip) {
        await tripService.update(editingTrip.id, data);
      } else {
        await tripService.create(data as any);
      }
      handleCloseDialog();
      loadTrips();
    } catch (error) {
      console.error('Failed to save trip:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await tripService.delete(id);
        loadTrips();
      } catch (error) {
        console.error('Failed to delete trip:', error);
      }
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
              <TableCell><strong>Route</strong></TableCell>
              <TableCell><strong>Bus</strong></TableCell>
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
                <TableCell>
                  {trip.origin} → {trip.destination}
                </TableCell>
                <TableCell>{trip.Bus?.name || 'N/A'}</TableCell>
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Origin"
                fullWidth
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Destination"
                fullWidth
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
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
                    {bus.name} ({bus.numberPlate})
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
