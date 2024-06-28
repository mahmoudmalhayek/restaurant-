// pages/MyOrders.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const MyOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`http://localhost:5000/api/orders/${id}`);
      setOrder(res.data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="h6">Status: {order.status}</Typography>
        <Typography variant="h6">Total Price: ${order.totalPrice}</Typography>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Items
          </Typography>
          <List>
            {order.items.map((item) => (
              <ListItem key={item.item._id}>
                <ListItemText primary={`${item.item.name} x ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default MyOrders;
