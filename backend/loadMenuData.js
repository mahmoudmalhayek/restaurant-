const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const menuData = require('./menu.json');

mongoose.connect('mongodb://localhost:27017/restaurant-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  loadMenuData();
}).catch(err => console.log(err));

const loadMenuData = async () => {
  try {
    await Menu.deleteMany({});
    await Menu.insertMany(menuData.menu);
    console.log('Menu data loaded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error loading menu data:', error);
    mongoose.connection.close();
  }
};
