const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const Coupon = require('./src/models/Coupon');
const Order = require('./src/models/Order');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Database Connected...');

    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await Order.deleteMany({}); // Fresh Start

    const products = [
      { name: "Neural Link Hoodie", price: 85, stock: 50, category: "Apparel", description: "450GSM hoodie with BCI-verified neuro-link graphic.", image: "/products/hoodie.jpg" },
      { name: "DevRel Beacon Lamp", price: 150, stock: 15, category: "Hardware", description: "Smart RGB lamp with GitHub API integration.", image: "/products/lamp.jpg" },
      { name: "Cyber Keycaps", price: 120, stock: 8, category: "Accessories", description: "PBT double-shot keycaps with translucent legends.", image: "/products/keycaps.jpg" },
      { name: "Silicon Valley Mat", price: 40, stock: 100, category: "Office", description: "Topographical map of the Bay Area on waterproof surface.", image: "/products/mat.jpg" },
      { name: "Cloud Native Cap", price: 30, stock: 200, category: "Apparel", description: "6-panel mesh cap with embroidered cloud logo.", image: "/products/cap.jpg" },
      { name: "Debugger Mug", price: 25, stock: 80, category: "Lifestyle", description: "Color-changing ceramic mug for code debugging.", image: "/products/mug.jpg" }
    ];

    const coupons = [
      { code: "WELCOME20", discountType: "PERCENTAGE", discountValue: 20, expirationDate: "2030-12-31" },
      { code: "FREE100", discountType: "PERCENTAGE", discountValue: 100, expirationDate: "2030-12-31" },
      { code: "EXPIRED50", discountType: "PERCENTAGE", discountValue: 50, expirationDate: "2020-01-01" } // EXPIRED CASE
    ];

    await Product.insertMany(products);
    await Coupon.insertMany(coupons);

    console.log('✅ SEEDING COMPLETE: Expired Coupon Added');
    process.exit();
  } catch (err) { console.error(err); process.exit(1); }
};

seedData();