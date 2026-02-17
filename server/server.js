require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Register Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/coupons', require('./src/routes/couponRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes')); // NEW EMAIL LOGIC

const PORT = 5000;
app.listen(PORT, () => console.log(`🔥 Aegis Backend Live on Port ${PORT}`));