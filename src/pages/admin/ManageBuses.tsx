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
  MenuItem,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { busService } from '../../services/api';
import type { Bus, BusType } from '../../services/api';

const BUS_TYPE_LABELS: Record<BusType, string> = {
  XL: 'Luxury-XL',
  AC: 'Air conditioned-AC',
  S: 'Semi Luxury-S',
  N: 'Normal-N',
};

export default function ManageBuses() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [formData, setFormData] = useState({
    numberPlate: '',
    type: 'N' as BusType,
    company: '',
    totalSeats: 50,
  });

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      setLoading(true);
      const response = await busService.getAll();
      setBuses(response.data || []);
    } catch (error: any) {
      console.error('Failed to load buses:', error);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (bus?: Bus) => {
    if (bus) {
      setEditingBus(bus);
      setFormData({
        numberPlate: bus.numberPlate,
        type: (bus.type as BusType) || 'N',
        company: bus.company || '',
        totalSeats: bus.totalSeats,
      });
    } else {
      setEditingBus(null);
      setFormData({ numberPlate: '', type: 'N', company: '', totalSeats: 50 });
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
    } catch (error: any) {
      console.error('Failed to save bus:', error);
      alert(error.response?.data?.message || 'Failed to save bus');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await busService.delete(id);
        loadBuses();
      } catch (error: any) {
        console.error('Failed to delete bus:', error);
        alert(error.response?.data?.message || 'Failed to delete bus');
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
              <TableCell><strong>Number Plate</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Total Seats</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.numberPlate}</TableCell>
                <TableCell>{bus.type ? BUS_TYPE_LABELS[bus.type] : '-'}</TableCell>
                <TableCell>{bus.company || '-'}</TableCell>
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
              label="Number Plate"
              fullWidth
              value={formData.numberPlate}
              onChange={(e) => setFormData({ ...formData, numberPlate: e.target.value })}
            />
            <TextField
              select
              label="Type"
              fullWidth
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as BusType })}
            >
              {Object.entries(BUS_TYPE_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Company"
              fullWidth
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
