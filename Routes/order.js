const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");  
const Cart = require("../Models/Cart");    

// POST route to place an order
router.post('/', async (req, res) => {
    try {
        const { userId, deliveryAddress, paymentMethod, email} = req.body;
        console.log(userId)
        console.log(deliveryAddress)
        console.log(paymentMethod)
        
        // Find the user's cart items and populate bike details
        const cartItems = await Cart.find({email}).populate('bikeId');
        console.log(cartItems)

        if (!cartItems.length) {
            return res.status(400).json({ message: "No items in the cart" });
        }

        // Create an order for each item in the cart
        for (let item of cartItems) {
            const newOrder = new Order({
                user: userId,
                bike: item.bikeId._id,
                price: item.bikeId.price,
                deliveryAddress,
                paymentMethod,
                status: 'Pending',  
                date: new Date()   
            });
            await newOrder.save();
        }

        // Clear the cart after placing the order
        await Cart.deleteMany({ userId });

        res.status(201).json({ success: true, message: "Order placed successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: `API Error while placing the order: ${err.message}` });
    }
});

// GET route to fetch all orders for a specific user
router.get('/:userId', async (req, res) => {
    try {
        console.log("Get")
        const userId = req.params.userId;
        console.log(userId)
        const orders = await Order.find({ user: userId }).populate('bike');
        console.log(orders)

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: `API Error while fetching orders: ${err.message}` });
    }
});

module.exports = router;
