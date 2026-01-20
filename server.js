const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const { sendOrderCompletionEmail } = require('./utils/emailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// Database (MongoDB)
const MONGODB_URI = process.env.MONGODB_URI;

const startServer = async () => {
    try {
        console.log('--------------------------------------------');
        console.log('📡 Attempting to connect to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Successfully connected to MongoDB');
        console.log('--------------------------------------------');

        // Start Server only after DB is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('--------------------------------------------');
        console.error('❌ MongoDB connection error:');
        console.error(err.message);
        console.error('Please check your MONGODB_URI and IP Whitelist.');
        console.error('--------------------------------------------');
        // On Render, we want the process to fail so we can see the error clearly
        process.exit(1);
    }
};

const Order = require('./models/Order');

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({
        status: 'OK',
        database: dbStatus,
        timestamp: new Date()
    });
});

// Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
    const orderData = req.body;

    // Backend duplicate check: Prevent same order (name + email) within a short time (e.g. 60 seconds)
    try {
        const oneMinuteAgo = new Date(Date.now() - 60000);
        const duplicateOrder = await Order.findOne({
            fullName: orderData.fullName,
            email: orderData.email,
            date: { $gte: oneMinuteAgo }
        });

        if (duplicateOrder) {
            console.log('Duplicate order detected and blocked:', orderData.email);
            return res.status(409).json({ message: 'A similar order was just placed. Please wait a moment.' });
        }
    } catch (err) {
        console.warn('Duplicate check failed, proceeding anyway:', err.message);
    }

    // Ensure ID is generated if not provided
    if (!orderData.id) {
        orderData.id = 'AY' + Date.now() + Math.floor(Math.random() * 1000);
    }
    // Default fields are handled by schema, but we can set them explicitly too
    orderData.status = orderData.status || 'pending';
    orderData.date = orderData.date || new Date();
    orderData.lastUpdated = new Date();

    try {
        const newOrder = await Order.create(orderData);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update an order (e.g. status)
app.put('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Remove _id from updates if present
        const updateData = { ...req.body };
        delete updateData._id;

        updateData.lastUpdated = new Date();

        // Perform update
        const updatedOrder = await Order.findOneAndUpdate(
            { id: orderId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

        // Send email notification if order is marked as completed
        if (updateData.status === 'completed') {
            console.log(`[Server] Order #${orderId} marked as completed. Triggering email notification...`);
            try {
                await sendOrderCompletionEmail(updatedOrder);
            } catch (emailErr) {
                console.error('[Server] ❌ Failed to execute sendOrderCompletionEmail:', emailErr.message);
            }
        }

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const result = await Order.deleteOne({ id: req.params.id });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Login Route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'ayush2024') {
        res.json({ success: true, token: 'admin-session-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the application
startServer();
