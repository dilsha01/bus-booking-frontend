import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService, getErrorMessage } from '../services/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    if (!password || !confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(token, password);
      setSuccessMessage('Your password has been reset successfully. You can now log in.');

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      console.error('Reset password failed:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 5, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a4d7a 0%, #0f3554 50%, #020617 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 25% 40%, rgba(59, 130, 246, 0.22), transparent 55%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.06), transparent 45%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.7)',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LockReset
              sx={{
                fontSize: 48,
                color: 'primary.main',
                mb: 1,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 0.5,
                fontSize: { xs: '1.6rem', sm: '1.9rem' },
              }}
            >
              Reset your password
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Choose a strong new password for your RideWay account.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2.5 }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="outlined"
              sx={{ mb: 2.5 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading || !token}
              sx={{
                py: 1.4,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2.5,
              }}
            >
              {loading ? 'Updating password...' : 'Update password'}
            </Button>
          </form>

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Button
              component={Link}
              to="/login"
              variant="text"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Back to login
            </Button>
            <Button
              component={Link}
              to="/forgot-password"
              variant="text"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Request new link
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
