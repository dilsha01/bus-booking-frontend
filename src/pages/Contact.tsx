import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

export default function Contact() {
  return (
    <Box sx={{ mt: 10, py: 6, minHeight: '80vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Get in Touch
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LocationOn color="primary" />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    123 Galle Road, Colombo 03, Sri Lanka
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Phone color="primary" />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +94 11 2345678
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Email color="primary" />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    info@rideway.lk
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Send us a Message
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" type="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Subject" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Message" multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" size="large" fullWidth>
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
