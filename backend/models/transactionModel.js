// transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionDate: { type: Date, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;