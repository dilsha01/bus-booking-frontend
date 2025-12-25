import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

export default function Contact() {
  return (
    <Box
      sx={{
        mt: 8,
        pt: 6,
        pb: 10,
        minHeight: '80vh',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              background: 'linear-gradient(135deg, #1a4d7a 0%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
          >
            Have a question about your booking or want to partner with us?
            We're here to help.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 8,
                },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                Get in Touch
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3, p: 2, borderRadius: 2, backgroundColor: 'action.hover' }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <LocationOn />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Halthota, Horana
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3, p: 2, borderRadius: 2, backgroundColor: 'action.hover' }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: '50%', 
                  backgroundColor: 'success.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Phone />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +94 34 2252600
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'action.hover' }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: '50%', 
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Email />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                info@busgo.lk
              </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 8,
                },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                Send us a Message
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Name" 
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Email" 
                    type="email" 
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Subject" 
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Message" 
                    multiline 
                    rows={5} 
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth
                    endIcon={<Send />}
                    sx={{
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
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
