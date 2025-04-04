const Transaction = require('../models/transactionModel');
const asyncHandler = require('express-async-handler');
require('dotenv').config()

const balanceSheetController = {
    getBalanceSheet: asyncHandler(async (req, res) => {

        try {
            const income = await Transaction.aggregate([
                { $match: { type: 'income' } },
                { $group: { _id: null, totalIncome: { $sum: '$amount' } } },
            ]);

            const expenses = await Transaction.aggregate([
                { $match: { type: 'expense' } },
                { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
            ]);

            const totalIncome = income.length > 0 ? income[0].totalIncome : 0;
            const totalExpenses = expenses.length > 0 ? expenses[0].totalExpenses : 0;
            const netBalance = totalIncome - totalExpenses;

            // Get all income and expense transactions
            const incomeTransactions = await Transaction.find({ type: 'income' });
            const expenseTransactions = await Transaction.find({ type: 'expense' });

            res.json({
                totalIncome,
                totalExpenses,
                netBalance,
                incomeTransactions,
                expenseTransactions,
            });
        } catch (error) {
            console.error('Get Balance Sheet Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = balanceSheetController;