const mongoose = require('mongoose');

const complaints = new mongoose.Schema({
    techname: { type: String, required: true },
    crop: { type: String, required: true },
    location: { type: [Number], required: true }, // [latitude, longitude]
    phoneNumber: { type: String, required: true },
    image: { type: String }, // Path to the uploaded image
});

module.exports = mongoose.model('Technology', complaints);
