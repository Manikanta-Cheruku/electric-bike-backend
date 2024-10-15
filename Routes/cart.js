const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');

// Add a bike to the cart
router.post('/addtocart', async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const { userId, bikeId, email } = req.body;

        // Validate request body
        if (!userId || !bikeId || !email) {
            const missingFields = [];
            if (!userId) missingFields.push('User ID');
            if (!bikeId) missingFields.push('Bike ID');
            if (!email) missingFields.push('Email');
            console.error('Validation error: Missing fields:', missingFields);
            return res.status(400).json({ message: `${missingFields.join(', ')} are required` });
        }

        // Check if bike is already in the cart
        const existingCartItem = await Cart.findOne({ email, bikeId });
        if (existingCartItem) {
            return res.status(400).json({ message: 'Bike is already in the cart' });
        }

        // Add new cart item
        const cartItem = new Cart({ userId, email, bikeId });
        await cartItem.save();

        res.status(201).json({ status: 'success', message: 'Bike added to cart successfully' });
    } catch (error) {
        console.error('Error adding bike to cart:', error);
        res.status(500).json({ status: 'error', message: 'Error adding bike to cart', error: error.message });
    }
});

// Get cart items for a user
router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Fetch cart items and populate bike details
        const cartItems = await Cart.find({ email }).populate('bikeId');
        if (!cartItems.length) {
            return res.status(404).json({ message: 'No items found in the cart' });
        }

        res.status(200).json({ status: 'success', data: cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching cart items', error: error.message });
    }
});

module.exports = router;
