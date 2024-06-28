// pages/Home.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={10}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Our Restaurant
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" component={Link} to="/signup" sx={{ mr: 2 }}>
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
