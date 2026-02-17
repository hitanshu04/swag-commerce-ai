const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true }, // Logs customer details
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  }],
  subtotal: { type: Number, required: true },
  discountApplied: { type: Number, default: 0 },
  finalTotal: { type: Number, required: true }, // Can be 0
  couponCode: { type: String, default: null },
  timestamp: { type: Date, default: Date.now } // Precise timestamp
});

module.exports = mongoose.model('Order', OrderSchema);