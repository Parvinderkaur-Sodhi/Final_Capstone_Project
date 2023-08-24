import React from 'react';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const developers = [
  { name: 'Parvinderkaur Sodhi', role: 'Developer', contact: '123-456-7890', email: 'john@example.com', location: 'Aurangabad, India' },
  { name: 'Raima Das', role: 'Developer', contact: '987-654-3210', email: 'jane@example.com', location: 'Kolkata, India' },
  { name: 'Avantika Nagrale', role: 'Developer', contact: '987-654-3210', email: 'jane@example.com', location: 'Chandrapur, India' },
];

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Meet Our Developers</Typography>
      <Grid container spacing={2}>
        {developers.map((developer, index) => (
          <Grid key={index} item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{developer.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>{developer.role}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <PhoneIcon color="primary" sx={{ marginRight: '0.5rem' }} />
                  <Typography variant="body2">{developer.contact}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <EmailIcon color="primary" sx={{ marginRight: '0.5rem' }} />
                  <Typography variant="body2">{developer.email}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon color="primary" sx={{ marginRight: '0.5rem' }} />
                  <Typography variant="body2">{developer.location}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <footer style={{ marginTop: '20rem', textAlign: 'center' }}>
        Made with Love @2023
      </footer>
    </Container>
  );
};

export default Contact;
