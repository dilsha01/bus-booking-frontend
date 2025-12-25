import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function About() {
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
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
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
              About BusGo
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                color: 'text.secondary',
                fontWeight: 400,
              }}
            >
              Making intercity travel simpler, safer and smarter.
            </Typography>
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                BusGo is Sri Lanka's leading bus booking platform, connecting
                travelers across the island with reliable and comfortable bus
                services.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Founded in 2024, we've helped thousands of passengers book
                their journeys seamlessly, partnering with trusted operators
                and modern fleets.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Our mission is to make bus travel accessible, affordable and
                hassle-free for everyone, from daily commuters to long-distance
                explorers.
              </Typography>
              
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                {['Real-time availability', 'Secure payments', 'Trusted operators', '24/7 support'].map((item) => (
                  <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <CheckCircle sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3.5, 
                    height: '100%',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                    15,000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Happy travelers who trusted BusGo for their journeys.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3.5, 
                    height: '100%',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    borderLeft: '4px solid',
                    borderColor: '#f59e0b',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#f59e0b' }}>
                    250+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Daily intercity routes covering key destinations.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3.5, 
                    height: '100%',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    borderLeft: '4px solid',
                    borderColor: '#10b981',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#10b981' }}>
                    24/7
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Customer support whenever you need assistance.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3.5, 
                    height: '100%',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                    borderLeft: '4px solid',
                    borderColor: '#ec4899',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#ec4899' }}>
                    Island
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Coverage from Colombo to Jaffna, Galle, Kandy and more.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
