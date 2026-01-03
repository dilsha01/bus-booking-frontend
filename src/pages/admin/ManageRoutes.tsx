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
import { Add, Edit } from '@mui/icons-material';
import { routeService } from '../../services/api';
import type { Route } from '../../services/api';

export default function ManageRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    routeNumber: '',
    origin: '',
    destination: '',
    stopsText: '',
    category: '',
  });

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const response = await routeService.getAll();
      setRoutes(response.data || []);
    } catch (error) {
      console.error('Failed to load routes:', error);
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (route?: Route) => {
    if (route) {
      setEditingRoute(route);
      setFormData({
        routeNumber: route.routeNumber,
        origin: route.origin,
        destination: route.destination,
        stopsText: (route.stops || []).join(', '),
        category: route.category || '',
      });
    } else {
      setEditingRoute(null);
      setFormData({
        routeNumber: '',
        origin: '',
        destination: '',
        stopsText: '',
        category: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingRoute(null);
  };

  const handleSave = async () => {
    try {
      const stops = formData.stopsText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        routeNumber: formData.routeNumber,
        origin: formData.origin,
        destination: formData.destination,
        stops,
        category: formData.category || null,
      };

      if (editingRoute) {
        await routeService.update(editingRoute.id, payload);
      } else {
        await routeService.create(payload as any);
      }

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

  const filteredRoutes = categoryFilter === 'all'
    ? routes
    : routes.filter((r) => r.category === categoryFilter);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Manage Routes
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['all', 'XL', 'AC', 'S', 'N'].map((type) => (
              <Button
                key={type}
                size="small"
                variant={categoryFilter === type ? 'contained' : 'outlined'}
                onClick={() => setCategoryFilter(type)}
              >
                {type === 'all' ? 'All' : type}
              </Button>
            ))}
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
            Add Route
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Route No</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Route</strong></TableCell>
              <TableCell><strong>Sections</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRoutes.map((route) => {
              const stops = route.stops || [];
              const sectionLabel =
                stops.length > 1
                  ? `${stops[0]}  ${stops[stops.length - 1]} (${stops.length} stops)`
                  : `${route.origin}  ${route.destination}`;

              return (
                <TableRow key={route.id} hover>
                  <TableCell>{route.routeNumber}</TableCell>
                  <TableCell>
                    {route.category && (
                      <Chip label={route.category} size="small" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell>
                    {route.origin}  {route.destination}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sectionLabel}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenDialog(route)}>
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
        <DialogTitle>{editingRoute ? 'Edit Route' : 'Add Route'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Route Number"
                fullWidth
                value={formData.routeNumber}
                onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Origin"
                fullWidth
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Destination"
                fullWidth
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                helperText="Optional: choose XL, AC, S or N"
              >
                <option value="" />
                {['XL', 'AC', 'S', 'N'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
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
