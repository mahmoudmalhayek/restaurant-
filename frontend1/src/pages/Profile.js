// pages/Profile.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, [user]);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography variant="h6">Username: {user.username}</Typography>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Orders
          </Typography>
          <List>
            {orders.map((order) => (
              <ListItem key={order._id} button component="a" href={`/orders/${order._id}`}>
                <ListItemText
                  primary={`Order ${order._id} - $${order.totalPrice}`}
                  secondary={`Status: ${order.status}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
