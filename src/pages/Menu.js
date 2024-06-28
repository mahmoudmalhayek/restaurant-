// pages/Menu.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import AuthContext from '../context/AuthContext';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get('http://localhost:5000/api/menu');
      setMenu(res.data);
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item._id]: (prevCart[item._id] || 0) + 1,
    }));
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item._id] > 1) {
        newCart[item._id] -= 1;
      } else {
        delete newCart[item._id];
      }
      return newCart;
    });
  };

  const handleOrder = async () => {
    try {
      const orderItems = Object.keys(cart).map((itemId) => ({
        item: itemId,
        quantity: cart[itemId],
      }));
      await axios.post(
        'http://localhost:5000/api/orders',
        { items: orderItems },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCart({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Menu
        </Typography>
        <Grid container spacing={4}>
          {menu.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography color="textSecondary">{item.description}</Typography>
                  <Typography variant="body2" component="p">
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => addToCart(item)}>
                    +
                  </Button>
                  <Button size="small" color="secondary" onClick={() => removeFromCart(item)}>
                    -
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleOrder}>
            Place Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Menu;
