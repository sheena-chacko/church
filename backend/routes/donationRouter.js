// donationRoutes.js
const express = require('express');
const donationRouter = express.Router();
const donationController = require('../controllers/donationController');

donationRouter.post('/webhook', express.raw({ type: 'application/json' }), donationController.stripeWebhook); // Stripe webhook endpoint

// Donation Routes
donationRouter.post('/',express.json(), donationController.createDonation); // Create a donation
donationRouter.get('/',express.json(), donationController.getAllDonations); // View all donations


module.exports = donationRouter;