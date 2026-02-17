const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Configure Email Sender (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set in .env
    pass: process.env.EMAIL_PASS  // Set in .env (App Password)
  }
});

router.post('/', async (req, res) => {
  const { cart, couponCode, customerEmail, discount } = req.body;
  
  try {
    let calculatedSubtotal = 0;
    const finalItems = [];

    // 1. Validate Stock & Calculate
    for (const item of cart) {
      const product = await Product.findById(item._id);
      if (!product || product.stock <= 0) {
        return res.status(400).json({ error: `OOS: ${item.name}` });
      }
      // Atomic Stock Update
      product.stock -= 1;
      await product.save();
      
      calculatedSubtotal += product.price;
      finalItems.push({ productId: product._id, name: product.name, price: product.price });
    }

    // 2. Final Logic
    const finalTotal = Math.max(0, calculatedSubtotal - (discount || 0));

    // 3. Save Order to DB
    const newOrder = new Order({
      customerEmail,
      items: finalItems,
      subtotal: calculatedSubtotal,
      discountApplied: discount || 0,
      finalTotal,
      couponCode
    });
    await newOrder.save();

    // 4. Send Zomato-Style Email (Async)
    if (process.env.EMAIL_USER) {
        const mailOptions = {
            from: '"Aegis Commerce" <orders@aegis.com>',
            to: customerEmail,
            subject: `Order Confirmed: #${newOrder._id.toString().slice(-6).toUpperCase()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">AEGIS COMMERCE</h1>
                        <p style="margin: 5px 0 0; color: #888; font-size: 12px;">OFFICIAL RECEIPT</p>
                    </div>
                    <div style="padding: 20px;">
                        <h2 style="color: #4f46e5; margin-top: 0;">Order Confirmed!</h2>
                        <p style="color: #555;">Hi there, your gear is being deployed.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            ${finalItems.map(item => `
                                <tr>
                                    <td style="padding: 10px 0; color: #333;">${item.name}</td>
                                    <td style="padding: 10px 0; text-align: right; font-weight: bold;">$${item.price}</td>
                                </tr>
                            `).join('')}
                        </table>
                        
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <div style="text-align: right;">
                            <p style="margin: 5px 0;">Subtotal: $${calculatedSubtotal.toFixed(2)}</p>
                            <p style="margin: 5px 0; color: #16a34a;">Discount: -$${(discount || 0).toFixed(2)}</p>
                            <h3 style="margin: 10px 0 0; font-size: 20px;">Total: $${finalTotal.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 11px; color: #aaa;">
                        Order ID: ${newOrder._id} • ${new Date().toLocaleString()}
                    </div>
                </div>
            `
        };
        
        transporter.sendMail(mailOptions).catch(err => console.log("Email Error:", err));
    }

    res.status(201).json({ success: true, orderId: newOrder._id });

  } catch (err) {
    console.error("Transaction Error:", err);
    res.status(500).json({ error: "Transaction Failed" });
  }
});

module.exports = router;