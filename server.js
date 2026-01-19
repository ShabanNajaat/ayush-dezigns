const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// Database (Local NeDB)
const Order = require('./models/Order');

// API Routes

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
    // Default fields
    if (!orderData.status) orderData.status = 'pending';
    if (!orderData.date) orderData.date = new Date();
    if (!orderData.lastUpdated) orderData.lastUpdated = new Date();

    try {
        const newOrder = await Order.insert(orderData);
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

        // Check if order exists
        const existingOrder = await Order.findOne({ id: orderId });
        if (!existingOrder) return res.status(404).json({ message: 'Order not found' });

        const updateSet = {};
        if (updateData.status) updateSet.status = updateData.status;

        // Add other fields from body if they are part of update
        // (Just mimicking original logic where mainly status was updated, but safer to follow pattern)
        // Original: if (req.body.status) order.status = req.body.status;

        updateSet.lastUpdated = new Date();

        // Perform update
        await Order.update({ id: orderId }, { $set: updateSet });

        // Fetch updated document
        const updatedOrder = await Order.findOne({ id: orderId });

        // Send email notification if order is marked as completed
        if (updateData.status === 'completed') {
            const { sendOrderCompletionEmail } = require('./utils/emailService');
            await sendOrderCompletionEmail(updatedOrder);
        }

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const numRemoved = await Order.remove({ id: req.params.id }, {});
        if (numRemoved === 0) return res.status(404).json({ message: 'Order not found' });
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

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Using local database: orders.db`);
});
