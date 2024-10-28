const mongoose = require('mongoose');

const TrialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const bikeSchema = new mongoose.Schema({
  image: {
    type : String
  },
  thumbnails : [String],
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { 
    type: Number, 
    required: true,
    min: [0, "Price must be positive"] 
  },
  distancePerCharge: { 
    type: Number, 
    required: true,
    min: [0, "Distance per charge must be positive"] 
  },
  batteryCapacity: { 
    type: Number, 
    required: true,
    min: [0, "Battery capacity must be positive"] 
  },
  manufacturer: { type: String },
  releaseDate: { type: Date, default: Date.now },
  sold: { type: Boolean, default: false },
  trials: [TrialSchema]
});

module.exports = mongoose.model('Bike', bikeSchema);
