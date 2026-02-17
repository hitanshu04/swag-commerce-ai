const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

router.post('/validate', async (req, res) => {
  const { code, cartTotal } = req.body;
  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) return res.status(404).json({ valid: false, message: "Invalid Coupon" });

    // EXPIRY LOGIC (As per assignment)
    if (new Date() > coupon.expirationDate) {
      return res.status(400).json({ valid: false, message: "This coupon has expired!" });
    }

    let discountAmount = coupon.discountType === 'PERCENTAGE' 
        ? (cartTotal * coupon.discountValue) / 100 
        : coupon.discountValue;

    res.json({ valid: true, discountAmount, code: coupon.code });
  } catch (err) { res.status(500).json({ message: "Validation Error" }); }
});

module.exports = router;