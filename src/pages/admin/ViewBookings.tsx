import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { bookingService } from '../../services/api';
import type { Booking } from '../../services/api';

export default function ViewBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getAll();
      setBookings(response.data || []);
    } catch (error: any) {
      console.error('Failed to load bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (booking: Booking) => {
    setEditingBooking(booking);
    setNewStatus(booking.status);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingBooking(null);
  };

  const handleUpdateStatus = async () => {
    if (!editingBooking) return;
    try {
      await bookingService.update(editingBooking.id, { status: newStatus as any });
      handleCloseDialog();
      loadBookings();
    } catch (error: any) {
      console.error('Failed to update booking:', error);
      alert(error.response?.data?.message || 'Failed to update booking');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingService.delete(id);
        loadBookings();
      } catch (error: any) {
        console.error('Failed to delete booking:', error);
        alert(error.response?.data?.message || 'Failed to delete booking');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
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
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        View Bookings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Route</strong></TableCell>
              <TableCell><strong>Bus</strong></TableCell>
              <TableCell><strong>Seats</strong></TableCell>
              <TableCell><strong>Price (LKR)</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Departure</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>#{booking.id}</TableCell>
                <TableCell>
                  {booking.Trip?.origin} → {booking.Trip?.destination}
                </TableCell>
                <TableCell>{booking.Trip?.Bus?.name || 'N/A'}</TableCell>
                <TableCell>{booking.seats}</TableCell>
                <TableCell>
                  {booking.Trip?.price
                    ? (parseFloat(booking.Trip.price) * booking.seats).toFixed(2)
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDateTime(booking.Trip?.departureTime)}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(booking)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(booking.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Update Booking Status</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Booking #{editingBooking?.id}
            </Typography>
            <TextField
              select
              label="Status"
              fullWidth
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateStatus} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
