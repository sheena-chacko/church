import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaFileInvoiceDollar, FaBalanceScale } from "react-icons/fa";

const BalanceSheet = () => {
  const [balanceData, setBalanceData] = useState({
    income: 0,
    expenses: 0,
    totalBalance: 0,
    revenueSources: [],
    expenseBreakdown: [],
    transactions: [], // New: List of detailed transactions
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated API Call (Replace with actual API request)
  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        setLoading(true);
        // Simulated API Response
        const data = {
          income: 7500,
          expenses: 4800,
          totalBalance: 2700,
          revenueSources: [
            { name: "Tithes & Offerings", amount: 4000 },
            { name: "Donations", amount: 2500 },
            { name: "Fundraising Events", amount: 1000 },
          ],
          expenseBreakdown: [
            { name: "Maintenance", amount: 1500 },
            { name: "Salaries", amount: 2000 },
            { name: "Community Programs", amount: 1300 },
          ],
          transactions: [
            { date: "March 1, 2025", description: "Tithes & Offerings", category: "Income", amount: 4000 },
            { date: "March 3, 2025", description: "Donation from John Doe", category: "Income", amount: 1500 },
            { date: "March 5, 2025", description: "Fundraising Event Revenue", category: "Income", amount: 1000 },
            { date: "March 7, 2025", description: "Church Maintenance", category: "Expense", amount: -1500 },
            { date: "March 10, 2025", description: "Staff Salaries", category: "Expense", amount: -2000 },
            { date: "March 15, 2025", description: "Community Programs", category: "Expense", amount: -1300 },
          ],
        };
        setBalanceData(data);
      } catch (err) {
        setError("Failed to load balance sheet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-green-900 text-center mb-8">Balance Sheet</h1>

        {loading ? (
          <p className="text-center text-gray-700">Loading balance sheet data...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                icon={<FaMoneyBillWave className="text-green-600 text-4xl" />}
                title="Total Income"
                amount={balanceData.income}
                color="green"
              />
              <Card
                icon={<FaFileInvoiceDollar className="text-red-600 text-4xl" />}
                title="Total Expenses"
                amount={balanceData.expenses}
                color="red"
              />
              <Card
                icon={<FaBalanceScale className="text-blue-600 text-4xl" />}
                title="Net Balance"
                amount={balanceData.totalBalance}
                color={balanceData.totalBalance >= 0 ? "green" : "red"}
              />
            </div>

            {/* Revenue & Expense Breakdown */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailCard title="Revenue Sources" data={balanceData?.revenueSources || []} color="green" />
              <DetailCard title="Expense Breakdown" data={balanceData?.expenseBreakdown || []} color="red" />
            </div>

            {/* Detailed Transactions List */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-3 text-left">Date</th>
                    <th className="border border-gray-300 p-3 text-left">Description</th>
                    <th className="border border-gray-300 p-3 text-left">Category</th>
                    <th className="border border-gray-300 p-3 text-right">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {balanceData.transactions.length > 0 ? (
                    balanceData.transactions.map((transaction, index) => (
                      <tr key={index} className="border-b border-gray-300">
                        <td className="p-3">{transaction.date}</td>
                        <td className="p-3">{transaction.description}</td>
                        <td className={`p-3 font-bold ${transaction.category === "Income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.category}
                        </td>
                        <td className={`p-3 text-right font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-3 text-center text-gray-500 italic">
                        No transactions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ icon, title, amount, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-8 border-${color}-500`}>
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className={`text-${color}-600 text-2xl font-bold`}>${amount}</p>
      </div>
    </div>
  </div>
);

// Reusable Detail List Component
const DetailCard = ({ title, data, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
    <ul className="space-y-2">
      {data.length > 0 ? (
        data.map((item, index) => (
          <li key={index} className="flex justify-between border-b pb-2">
            <span className="text-gray-700">{item.name}</span>
            <span className={`text-${color}-600 font-bold`}>${item.amount}</span>
          </li>
        ))
      ) : (
        <p className="text-gray-500 italic">No data available</p>
      )}
    </ul>
  </div>
);

export default BalanceSheet;
