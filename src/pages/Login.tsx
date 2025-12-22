import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';

export default function Login() {
  return (
    <Box
      sx={{
        mt: 10,
        py: 6,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
            Login
          </Typography>
          <TextField fullWidth label="Email" type="email" sx={{ mb: 3 }} />
          <TextField fullWidth label="Password" type="password" sx={{ mb: 3 }} />
          <Button variant="contained" size="large" fullWidth sx={{ mb: 2 }}>
            Login
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Button variant="text" size="small">
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
