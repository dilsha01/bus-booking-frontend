import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { label: 'Journeys', path: '/trips' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/login');
  };

  const drawer = (
    <Box 
      sx={{ 
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }} 
      role="presentation"
    >
      <Box 
        sx={{ 
          p: 2.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DirectionsBusIcon sx={{ fontSize: 32 }} />
          <Box sx={{ fontWeight: 700, fontSize: '1.5rem' }}>RideWay</Box>
        </Box>
        <IconButton 
          onClick={toggleMobile}
          sx={{ color: 'white' }}
          aria-label="Close menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flex: 1, pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={toggleMobile}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {isAuthenticated && isAdmin && (
          <Button
            component={RouterLink}
            to="/admin"
            variant="contained"
            color="warning"
            fullWidth
            startIcon={<AdminPanelSettingsIcon />}
            onClick={toggleMobile}
            sx={{
              py: 1.2,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            Admin Panel
          </Button>
        )}
        {isAuthenticated ? (
          <>
            <Box sx={{ px: 1.5, py: 1, backgroundColor: 'action.hover', borderRadius: 1 }}>
              <Box sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
                {user?.name}
              </Box>
              <Box sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                {user?.email}
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={() => {
                handleLogout();
                toggleMobile();
              }}
              sx={{
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<LoginIcon />}
              onClick={toggleMobile}
              sx={{
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/admin"
              variant="text"
              color="primary"
              onClick={toggleMobile}
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              Admin Login
            </Button>
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={toggleMobile}
              sx={{
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={2}
          sx={{
            backgroundColor: 'rgba(26, 77, 122, 0.97)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <IconButton 
                  component={RouterLink} 
                  to="/" 
                  sx={{ 
                    color: 'white', 
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  aria-label="Go to home"
                >
                  <DirectionsBusIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Box
                  component={RouterLink}
                  to="/"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    color: 'white',
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'secondary.light',
                    },
                  }}
                >
                  RideWay
                </Box>
              </Box>

              {/* Desktop nav */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      px: 2.5,
                      py: 1,
                      position: 'relative',
                      color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.9)',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: location.pathname === item.path ? '60%' : '0%',
                        height: '3px',
                        backgroundColor: 'secondary.main',
                        borderRadius: '2px 2px 0 0',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        color: 'white',
                        '&::after': {
                          width: '60%',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {isAuthenticated && isAdmin && (
                  <Button
                    component={RouterLink}
                    to="/admin"
                    startIcon={<AdminPanelSettingsIcon />}
                    sx={{
                      ml: 2,
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 0.8,
                      backgroundColor: 'rgba(255,107,53,0.2)',
                      border: '2px solid rgba(255,107,53,0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,107,53,0.3)',
                        borderColor: 'secondary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Admin
                  </Button>
                )}

                {isAuthenticated ? (
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={handleUserMenuOpen}
                      sx={{
                        p: 0.5,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'secondary.main',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleUserMenuClose}
                      sx={{
                        '& .MuiMenu-paper': {
                          marginTop: '8px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <MenuItem disabled sx={{ fontWeight: 600 }}>
                        {user?.name}
                      </MenuItem>
                      <MenuItem disabled sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        {user?.email}
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout} sx={{ fontWeight: 500 }}>
                        <LogoutIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <>
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="outlined"
                      startIcon={<LoginIcon />}
                      sx={{
                        ml: 2,
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.7)',
                        fontWeight: 600,
                        px: 3,
                        py: 0.8,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderWidth: 2,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/signup"
                      variant="contained"
                      color="secondary"
                      sx={{
                        ml: 1.5,
                        fontWeight: 600,
                        px: 3,
                        py: 0.8,
                        boxShadow: 2,
                        '&:hover': {
                          backgroundColor: 'secondary.dark',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(255,107,53,0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sign Up
                    </Button>
                    <Typography
                      component={RouterLink}
                      to="/admin"
                      sx={{
                        ml: 1.5,
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.85)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        '&:hover': {
                          color: 'white',
                        },
                      }}
                    >
                      Admin Login
                    </Typography>
                  </>
                )}
              </Box>

              {/* Mobile menu button */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton 
                  color="inherit" 
                  onClick={toggleMobile}
                  aria-label="Open navigation menu"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <MenuIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobile}
        sx={{ 
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
