const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // Detailed description required
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Categorized browsing
  stock: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  // Tiered Pricing: If you buy 'threshold' amount, you get 'discountPercent' off
  tieredPricing: {
    threshold: { type: Number, default: 10 }, 
    discountPercent: { type: Number, default: 5 }
  }
});

module.exports = mongoose.model('Product', ProductSchema);