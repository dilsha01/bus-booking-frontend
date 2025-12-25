import { Container, Typography, Box, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { CheckCircle, Error as ErrorIcon, Email } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { api, getErrorMessage } from '../services/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      setStatus('loading');
      const response = await api.get(`/auth/verify-email?token=${token}`);
      
      // Auto-login after successful verification
      if (response.data.token && response.data.user) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      setStatus('success');
      setMessage(response.data.message || 'Email verified successfully!');
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error: any) {
      console.error('Verification failed:', error);
      setStatus('error');
      setMessage(getErrorMessage(error));
    }
  };

  const handleResend = async () => {
    // This would require the email - for now just show message
    setResending(true);
    setTimeout(() => {
      setResending(false);
      alert('Please use the resend link from the login page');
    }, 1000);
  };

  return (
    <Box
      sx={{
        mt: 8,
        py: 8,
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a4d7a 0%, #0f3554 50%, #020617 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.7)',
          }}
        >
          {status === 'loading' && (
            <>
              <CircularProgress size={80} sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Verifying your email...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please wait while we verify your account
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'success.main' }}>
                Email Verified!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {message}
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                You've been automatically logged in. Redirecting to home page...
              </Alert>
              <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Go to Home
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 3 }} />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'error.main' }}>
                Verification Failed
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {message}
              </Typography>
              <Alert severity="error" sx={{ mb: 3 }}>
                This verification link may have expired or is invalid.
              </Alert>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Go to Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Sign Up Again
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
