const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email : { type : String, required : true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
    quantity: { type: Number, default : 1}
});

module.exports = mongoose.model('Cart', cartSchema);
