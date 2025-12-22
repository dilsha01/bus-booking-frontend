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
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { busService } from '../../services/api';
import type { Bus } from '../../services/api';

export default function ManageBuses() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    numberPlate: '',
    totalSeats: 50,
  });

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const response = await busService.getAll();
      setBuses(response.data);
    } catch (error) {
      console.error('Failed to load buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (bus?: Bus) => {
    if (bus) {
      setEditingBus(bus);
      setFormData({
        name: bus.name,
        numberPlate: bus.numberPlate,
        totalSeats: bus.totalSeats,
      });
    } else {
      setEditingBus(null);
      setFormData({ name: '', numberPlate: '', totalSeats: 50 });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingBus(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingBus) {
        await busService.update(editingBus.id, formData);
      } else {
        await busService.create(formData);
      }
      handleCloseDialog();
      loadBuses();
    } catch (error) {
      console.error('Failed to save bus:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await busService.delete(id);
        loadBuses();
      } catch (error) {
        console.error('Failed to delete bus:', error);
      }
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
          Manage Buses
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Bus
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Number Plate</strong></TableCell>
              <TableCell><strong>Total Seats</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.name}</TableCell>
                <TableCell>{bus.numberPlate}</TableCell>
                <TableCell>{bus.totalSeats}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(bus)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(bus.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingBus ? 'Edit Bus' : 'Add New Bus'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Bus Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Number Plate"
              fullWidth
              value={formData.numberPlate}
              onChange={(e) => setFormData({ ...formData, numberPlate: e.target.value })}
            />
            <TextField
              label="Total Seats"
              type="number"
              fullWidth
              value={formData.totalSeats}
              onChange={(e) => setFormData({ ...formData, totalSeats: parseInt(e.target.value) })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingBus ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
