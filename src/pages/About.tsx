import { Container, Typography, Box, Paper } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ mt: 10, py: 6, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          About RideWay
        </Typography>
        <Paper sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            RideWay is Sri Lanka's leading bus booking platform, connecting travelers across the island
            with reliable and comfortable bus services.
          </Typography>
          <Typography variant="body1" paragraph>
            Founded in 2024, we've helped thousands of passengers book their journeys seamlessly,
            partnering with the best bus operators in the country.
          </Typography>
          <Typography variant="body1">
            Our mission is to make bus travel accessible, affordable, and hassle-free for everyone.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
