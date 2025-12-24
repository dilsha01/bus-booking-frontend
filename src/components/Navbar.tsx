import { AppBar, Toolbar, Container, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(26, 77, 122, 0.95)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton component={RouterLink} to="/" sx={{ color: 'white', p: 0 }}>
              <DirectionsBusIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                fontSize: '1.8rem',
                color: 'white',
                textDecoration: 'none',
                letterSpacing: '0.5px',
              }}
            >
              BusGo
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Button component={RouterLink} to="/trips" color="inherit" sx={{ fontSize: '1rem' }}>
              Journeys
            </Button>
            <Button component={RouterLink} to="/about" color="inherit" sx={{ fontSize: '1rem' }}>
              About Us
            </Button>
            <Button component={RouterLink} to="/contact" color="inherit" sx={{ fontSize: '1rem' }}>
              Contact
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': { borderColor: 'secondary.main', backgroundColor: 'rgba(255,107,53,0.1)' },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
