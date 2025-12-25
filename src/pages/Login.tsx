import { Container, Typography, Box, Paper, TextField, Button, Grid, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, getErrorMessage } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      // Store token and user info
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      // Check if error is due to unverified email
      if (err.response?.data?.requiresVerification) {
        setNeedsVerification(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        py: 8,
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background:
          'linear-gradient(135deg, #1a4d7a 0%, #0f3554 50%, #020617 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.2), transparent 50%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                pr: { md: 4 },
                mb: { xs: 4, md: 0 },
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome back to RideWay
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                Manage your bookings, view trip details, and enjoy a smoother
                travel experience with your RideWay account.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Secure login with modern encryption. Your data is always safe
                with us.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={10}
              sx={{
                p: 5,
                borderRadius: 4,
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.7)',
                backgroundColor: 'background.paper',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}
              >
                Login
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 4, textAlign: 'center' }}
              >
                Enter your credentials to access your account
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                  {needsVerification && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Please check your email for the verification link.
                    </Typography>
                  )}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField 
                  fullWidth 
                  label="Email" 
                  type="email" 
                  required
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }} 
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                  <Button 
                    variant="text" 
                    size="small"
                    sx={{ 
                      textTransform: 'none',
                      '&:hover': { color: 'primary.dark' },
                    }}
                  >
                    Forgot password?
                  </Button>
                </Box>
                <Button 
                  type="submit"
                  variant="contained" 
                  size="large" 
                  fullWidth 
                  disabled={loading}
                  endIcon={<LoginIcon />}
                  sx={{ 
                    mb: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <Button 
                  component={Link}
                  to="/signup"
                  variant="text" 
                  size="small"
                  sx={{ 
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Sign Up
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
