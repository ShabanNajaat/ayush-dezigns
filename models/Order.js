const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    occasion: { type: String },
    dressType: { type: String },
    fabric: { type: String },
    colors: { type: String },
    designDetails: { type: String },
    budget: { type: String },
    timeline: { type: String },
    id: { type: String, unique: true, required: true },
    status: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
