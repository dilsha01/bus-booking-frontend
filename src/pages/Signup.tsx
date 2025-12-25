import { Container, Typography, Box, Paper, TextField, Button, Grid, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, getErrorMessage } from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.register(formData.name, formData.email, formData.password);
      
      // Show success message - no auto-login
      setRegistrationSuccess(true);
      setUserEmail(formData.email);
    } catch (err: any) {
      console.error('Signup failed:', err);
      const errorMsg = getErrorMessage(err);
      
      // Add helpful message for duplicate email
      if (errorMsg.toLowerCase().includes('already exists')) {
        setError(`${errorMsg}. Already have an account? `);
      } else {
        setError(errorMsg);
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
          background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.2), transparent 50%)',
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
                Join BusGo Today
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                Create your account and start booking bus tickets with ease.
                Enjoy exclusive benefits and a seamless travel experience.
              </Typography>
              <Box component="ul" sx={{ opacity: 0.8, pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ✓ Quick and easy booking process
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ✓ View and manage all your bookings
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ✓ Get exclusive offers and discounts
                </Typography>
                <Typography component="li" variant="body2">
                  ✓ Secure payment options
                </Typography>
              </Box>
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
                Create Account
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 4, textAlign: 'center' }}
              >
                Fill in your details to get started
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                  {error.toLowerCase().includes('already exists') && (
                    <Link to="/login" style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}>
                      Login here
                    </Link>
                  )}
                </Alert>
              )}

              {registrationSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Registration Successful!
                  </Typography>
                  <Typography variant="body2">
                    We've sent a verification email to <strong>{userEmail}</strong>. 
                    Please check your inbox and click the verification link to activate your account.
                  </Typography>
                </Alert>
              )}

              {!registrationSuccess && (
                <form onSubmit={handleSubmit}>
                  <TextField 
                    fullWidth 
                    label="Full Name" 
                    type="text" 
                    required
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange('name')}
                    sx={{ mb: 3 }} 
                  />
                  <TextField 
                    fullWidth 
                    label="Email" 
                    type="email" 
                    required
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange('email')}
                    sx={{ mb: 3 }} 
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange('password')}
                    sx={{ mb: 3 }}
                    helperText="Must be at least 6 characters"
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
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    variant="outlined"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    sx={{ mb: 3 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button 
                    type="submit"
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    disabled={loading}
                    endIcon={<PersonAdd />}
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
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>
              )}
              
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Button 
                  component={Link}
                  to="/login"
                  variant="text" 
                  size="small"
                  sx={{ 
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
