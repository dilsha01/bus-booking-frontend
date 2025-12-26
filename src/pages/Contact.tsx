// import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
// import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

// export default function Contact() {
//   return (
//     <Box
//       sx={{
//         mt: 8,
//         pt: 6,
//         pb: 10,
//         minHeight: '80vh',
//         backgroundColor: 'background.default',
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box sx={{ textAlign: 'center', mb: 6 }}>
//           <Typography 
//             variant="h3" 
//             sx={{ 
//               fontWeight: 700, 
//               mb: 2,
//               background: 'linear-gradient(135deg, #1a4d7a 0%, #0ea5e9 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Contact Us
//           </Typography>
//           <Typography 
//             variant="body1" 
//             color="text.secondary" 
//             sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}
//           >
//             Have a question about your booking or want to partner with us?
//             We're here to help.
//           </Typography>
//         </Box>

//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Paper 
//               elevation={3}
//               sx={{ 
//                 p: 4,
//                 borderRadius: 3,
//                 height: '100%',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   boxShadow: 8,
//                 },
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
//                 Get in Touch
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3, p: 2, borderRadius: 2, backgroundColor: 'action.hover' }}>
//                 <Box sx={{ 
//                   p: 1.5, 
//                   borderRadius: '50%', 
//                   backgroundColor: 'primary.main',
//                   color: 'white',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                   <LocationOn />
//                 </Box>
//                 <Box>
//                   <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
//                     Address
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Halthota, Horana
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3, p: 2, borderRadius: 2, backgroundColor: 'action.hover' }}>
//                 <Box sx={{ 
//                   p: 1.5, 
//                   borderRadius: '50%', 
//                   backgroundColor: 'success.main',
//                   color: 'white',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                   <Phone />
//                 </Box>
//                 <Box>
//                   <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
//                     Phone
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     +94 34 2252600
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'action.hover' }}>
//                 <Box sx={{ 
//                   p: 1.5, 
//                   borderRadius: '50%', 
//                   backgroundColor: 'secondary.main',
//                   color: 'white',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                   <Email />
//                 </Box>
//                 <Box>
//                   <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
//                     Email
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                 info@rideway.lk
//               </Typography>
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Paper 
//               elevation={3}
//               sx={{ 
//                 p: 4,
//                 borderRadius: 3,
//                 height: '100%',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   boxShadow: 8,
//                 },
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
//                 Send us a Message
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <TextField 
//                     fullWidth 
//                     label="Name" 
//                     required
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField 
//                     fullWidth 
//                     label="Email" 
//                     type="email" 
//                     required
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField 
//                     fullWidth 
//                     label="Subject" 
//                     required
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField 
//                     fullWidth 
//                     label="Message" 
//                     multiline 
//                     rows={5} 
//                     required
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button 
//                     variant="contained" 
//                     size="large" 
//                     fullWidth
//                     endIcon={<Send />}
//                     sx={{
//                       py: 1.5,
//                       fontSize: '1rem',
//                       fontWeight: 600,
//                       boxShadow: 3,
//                       '&:hover': {
//                         boxShadow: 6,
//                         transform: 'translateY(-2px)',
//                       },
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     Send Message
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
import { Container, Typography, Box, Paper, TextField, Button, Grid, Divider } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

export default function Contact() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 5, md: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1.5,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
              letterSpacing: -0.5,
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
            sx={{
              maxWidth: 680,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.08rem' },
              lineHeight: 1.75,
            }}
          >
            Have a question about your booking or want to partner with us? We&apos;re here to help.
          </Typography>
        </Box>

        {/* Content */}
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          {/* Left: Contact info */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                height: '100%',
                boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  background: 'linear-gradient(90deg, #2563eb, #f97316)',
                  opacity: 0.9,
                },
              }}
            >
              {/* <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                Get in Touch
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                Reach us via phone, email, or visit our office. We typically respond within 24 hours.
              </Typography> */}

              <Typography
  variant="h5"
  sx={{ fontWeight: 800, mb: 1.5, textAlign: 'center' }}
>
  Get in Touch
</Typography>

<Typography
  variant="body2"
  color="text.secondary"
  sx={{ lineHeight: 1.7, mb: 3, textAlign: 'center' }}
>
  Reach us via phone, email, or visit our office. We typically respond within 24 hours.
</Typography>


              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                }}
              >
                {/* Address */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'action.hover',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <LocationOn />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.25 }}>
                      Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Halthota, Horana
                    </Typography>
                  </Box>
                </Box>

                {/* Phone */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'action.hover',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'success.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.25 }}>
                      Phone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +94 34 2252600
                    </Typography>
                  </Box>
                </Box>

                {/* Email */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'action.hover',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Email />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.25 }}>
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      info@rideway.lk
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                For urgent booking changes, please call us directly.
              </Typography>
            </Paper>
          </Grid>

          {/* Right: Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                height: '100%',
                boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                Send us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                Fill out the form and our team will get back to you as soon as possible.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Name" required variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" type="email" required variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Subject" required variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Message" multiline rows={6} required variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    endIcon={<Send />}
                    sx={{
                      py: 1.4,
                      fontSize: '1rem',
                      fontWeight: 800,
                      borderRadius: 2.5,
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.25s ease',
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
