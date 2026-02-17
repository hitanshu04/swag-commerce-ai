const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['PERCENTAGE', 'FIXED'], required: true },
  discountValue: { type: Number, required: true }, // e.g., 100 (for 100% off) or 50 (for $50 off)
  expirationDate: { type: Date, required: true },
  usageLimit: { type: Number, default: 100 }, // Max times it can be used globally
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Coupon', CouponSchema);