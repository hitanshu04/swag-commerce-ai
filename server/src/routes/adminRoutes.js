const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Order = require('../models/Order');

router.get('/reset-db', async (req, res) => {
  try {
    // 1. Wipe everything
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await Order.deleteMany({});

    // 2. Fresh Seed Data
    const products = [
      { name: "Neural Link Hoodie", price: 85, stock: 50, category: "Apparel", description: "Heavyweight organic hoodie.", image: "/products/hoodie.jpg" },
      { name: "DevRel Beacon Lamp", price: 150, stock: 15, category: "Hardware", description: "Smart RGB desk lamp.", image: "/products/lamp.jpg" },
      { name: "Cyber Keycaps", price: 120, stock: 8, category: "Accessories", description: "PBT double-shot keycaps.", image: "/products/keycaps.jpg" },
      { name: "Silicon Valley Mat", price: 40, stock: 100, category: "Office", description: "Waterproof topographical map mat.", image: "/products/mat.jpg" },
      { name: "Cloud Native Cap", price: 30, stock: 200, category: "Apparel", description: "Structured 6-panel tech cap.", image: "/products/cap.jpg" },
      { name: "Debugger Mug", price: 25, stock: 80, category: "Lifestyle", description: "Color-changing ceramic mug.", image: "/products/mug.jpg" }
    ];

    const coupons = [
      { code: "WELCOME20", discountType: "PERCENTAGE", discountValue: 20, expirationDate: "2030-12-31" },
      { code: "FREE100", discountType: "PERCENTAGE", discountValue: 100, expirationDate: "2030-12-31" },
      { code: "EXPIRED50", discountType: "PERCENTAGE", discountValue: 50, expirationDate: "2020-01-01" }
    ];

    await Product.insertMany(products);
    await Coupon.insertMany(coupons);

    res.send("<h1>✅ Database Reset Successful!</h1><p>All orders cleared and fresh inventory loaded.</p>");
  } catch (err) {
    res.status(500).send("❌ Reset Failed: " + err.message);
  }
});

module.exports = router;