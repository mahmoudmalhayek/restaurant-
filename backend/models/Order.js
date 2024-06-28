const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ['Processing', 'Preparing', 'Ready', 'Delivered'], default: 'Processing' },
  totalPrice: { type: Number, required: true },
  orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
