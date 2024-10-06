const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
    price: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
