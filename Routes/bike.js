const express = require("express");
const router = express.Router();
const Bike = require('../Models/Bike');

// Get all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ message: "API error occurred while fetching bikes", error: err.message });
  }
});

// Add a new bike
router.post('/add', async (req, res) => {
  try {
    const newBike = new Bike(req.body);
    await newBike.save();
    res.status(201).json({ message: "Bike added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "API error occurred while adding the bike", error: err.message });
  }
});

// Get bike details by ID
router.get('/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json(bike);
  } catch (err) {
    res.status(500).json({ message: "API error occurred while fetching bike details", error: err.message });
  }
});

// Update a bike by ID
router.put('/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json(bike);
  } catch (err) {
    res.status(500).json({ message: "API error occurred while updating the bike", error: err.message });
  }
});

// Delete a bike by ID
router.delete('/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json({ message: "Bike deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "API error occurred while deleting the bike", error: err.message });
  }
});

module.exports = router;
