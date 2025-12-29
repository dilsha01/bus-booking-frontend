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
  CircularProgress,
  Grid,
  Chip,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { tripService } from '../../services/api';
import type { Trip } from '../../services/api';

export default function ManageRoutes() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState({
    routeNumber: '',
    origin: '',
    destination: '',
    stopsText: '',
  });

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const response = await tripService.getAll();
      setTrips(response.data || []);
    } catch (error) {
      console.error('Failed to load routes:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (trip: Trip) => {
    setEditingTrip(trip);
    setFormData({
      routeNumber: trip.routeNumber,
      origin: trip.origin,
      destination: trip.destination,
      stopsText: (trip.stops || []).join(', '),
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTrip(null);
  };

  const handleSave = async () => {
    if (!editingTrip) return;

    try {
      const stops = formData.stopsText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      await tripService.update(editingTrip.id, {
        routeNumber: formData.routeNumber,
        origin: formData.origin,
        destination: formData.destination,
        stops,
      });

      handleCloseDialog();
      loadRoutes();
    } catch (error: any) {
      console.error('Failed to update route:', error);
      alert(error.response?.data?.message || 'Failed to update route');
    }
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
          Manage Routes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Edit route numbers and sections (stops) for each trip.
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Route No</strong></TableCell>
              <TableCell><strong>Route</strong></TableCell>
              <TableCell><strong>Sections</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => {
              const stops = trip.stops || [];
              const sectionLabel =
                stops.length > 1
                  ? `${stops[0]}  ${stops[stops.length - 1]} (${stops.length} stops)`
                  : `${trip.origin}  ${trip.destination}`;

              return (
                <TableRow key={trip.id} hover>
                  <TableCell>{trip.id}</TableCell>
                  <TableCell>{trip.routeNumber}</TableCell>
                  <TableCell>
                    {trip.origin}  {trip.destination}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sectionLabel}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenDialog(trip)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Route</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Route Number"
                fullWidth
                value={formData.routeNumber}
                onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Origin"
                fullWidth
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Destination"
                fullWidth
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Sections / Stops (comma separated, in order)"
                fullWidth
                multiline
                minRows={3}
                value={formData.stopsText}
                onChange={(e) => setFormData({ ...formData, stopsText: e.target.value })}
                helperText="Include origin and destination. Example: Maharagama, Navinna, Delkanda, Nugegoda, Kirulapone, Thunmulla, Town Hall, Colombo"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
