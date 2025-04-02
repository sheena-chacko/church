import React, { useState } from "react";

const BudgetPlanning = () => {
  // State for storing transactions
  const [budgetItems, setBudgetItems] = useState([]);

  // Input fields for transactions
  const [category, setCategory] = useState("Income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Function to add a new transaction
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }

    // Create new transaction object
    const newItem = {
      id: budgetItems.length + 1,
      category,
      description,
      amount: parseFloat(amount),
      date,
    };

    // Update the state
    setBudgetItems([...budgetItems, newItem]);

    // Reset input fields
    setDescription("");
    setAmount("");
    setDate("");
  };

  // Delete a transaction
  const handleDelete = (id) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const totalIncome = budgetItems
    .filter((item) => item.category === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = budgetItems
    .filter((item) => item.category === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const remainingBudget = totalIncome - totalExpenses;

  // Function to print the budget summary
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Church Budget Planning
        </h1>

        {/* Budget Form */}
        <form
          onSubmit={handleAddItem}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Description (e.g., Donation, Rent)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="col-span-1 md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full"
            >
              Add Transaction
            </button>
            <button
              type="button"
              onClick={() => {
                setCategory("Income");
                setDescription("");
                setAmount("");
                setDate("");
              }}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition w-full"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Budget Summary */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Budget Summary
          </h2>
          <p className="text-green-600 text-lg font-bold">
            Total Income: ${totalIncome.toFixed(2)}
          </p>
          <p className="text-red-600 text-lg font-bold">
            Total Expenses: ${totalExpenses.toFixed(2)}
          </p>
          <p
            className={`text-lg font-bold ${
              remainingBudget >= 0 ? "text-green-800" : "text-red-800"
            }`}
          >
            Remaining Budget: ${remainingBudget.toFixed(2)}
          </p>
        </div>

        {/* Transaction List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2 text-center">
            Detailed Transaction Records
          </h2>

          {budgetItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg shadow-md ${
                    item.category === "Income"
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "bg-red-50 border-l-4 border-red-500"
                  }`}
                >
                  <p className="text-gray-600 text-sm">{item.date}</p>
                  <h3
                    className={`text-lg font-bold ${
                      item.category === "Income"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {item.category}: {item.description}
                  </h3>
                  <p
                    className={`font-semibold mt-2 text-lg ${
                      item.category === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${item.amount.toFixed(2)}
                  </p>

                  {/* Transaction Explanation Section */}
                  <p className="mt-2 text-gray-700 italic">
                    {item.category === "Income"
                      ? `This amount was received as income for ${item.description} on ${item.date}. This could be from donations, fundraising, or offerings.`
                      : `This expense was recorded for ${item.description} on ${item.date}. This could include utility bills, rent, or other church-related costs.`}
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No transactions added yet.
            </p>
          )}
        </div>

        {/* Print Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Print Budget Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanning;
