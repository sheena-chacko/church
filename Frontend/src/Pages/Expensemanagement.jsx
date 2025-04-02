import React, { useState } from "react";

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.category || !formData.amount) {
      alert("Please fill in all required fields.");
      return;
    }
    setExpenses([...expenses, formData]);
    setFormData({ date: "", category: "", amount: "", description: "" });
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalExpense = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Expense Management</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount ($)"
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (Optional)"
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Expense
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Expense List</h2>
          {expenses.length > 0 ? (
            <div>
              <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Amount</th>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index} className="text-center bg-gray-100">
                      <td className="border border-gray-300 p-2">{expense.date}</td>
                      <td className="border border-gray-300 p-2">{expense.category}</td>
                      <td className="border border-gray-300 p-2">${expense.amount}</td>
                      <td className="border border-gray-300 p-2">{expense.description}</td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right font-bold text-lg text-green-900">
                Total Expense: ${totalExpense}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No expenses added yet.</p>
          )}
        </div>

        <button
          onClick={handlePrint}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Print Expenses
        </button>
      </div>
    </div>
  );
};

export default ExpenseManagement;
