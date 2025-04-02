const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    donationDate: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;