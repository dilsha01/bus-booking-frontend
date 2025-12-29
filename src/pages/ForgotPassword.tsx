import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { authService, getErrorMessage } from '../services/api';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      await authService.forgotPassword(email);
      setSuccessMessage(
        'If an account with that email exists, a password reset link has been sent.'
      );
    } catch (err) {
      console.error('Forgot password failed:', err);
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
            <Email
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
              Forgot your password?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Enter your email address and we'll send you a link to reset your
              password.
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
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              sx={{ mb: 2.5 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.4,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2.5,
              }}
            >
              {loading ? 'Sending link...' : 'Send reset link'}
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
              to="/signup"
              variant="text"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Create new account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
