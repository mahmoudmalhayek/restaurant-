// pages/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      dispatch({ type: 'LOGIN', payload: res.data });
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
