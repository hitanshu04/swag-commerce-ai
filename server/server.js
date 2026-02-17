require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to Database
connectDB();

// 2. Register Business Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/coupons', require('./src/routes/couponRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));

// 3. Admin Reset Route (Crucial for Deployment Evaluation)
app.use('/api/admin', require('./src/routes/adminRoutes'));

// 4. Start Server
// Note: process.env.PORT is required for live deployment environments
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Aegis Backend Live on Port ${PORT}`));