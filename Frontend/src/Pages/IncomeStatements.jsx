import React, { useState } from "react";

const IncomeStatements = () => {
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    source: "",
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.source || !formData.amount) {
      setError("Date, Source, and Amount are required!");
      return;
    }
    setError("");
    setIncomeRecords([...incomeRecords, formData]);
    setFormData({ date: "", source: "", amount: "", description: "" });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">Income Statements</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            name="source"
            placeholder="Income Source (e.g., Donations, Events)"
            value={formData.source}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount ($)"
            value={formData.amount}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            name="description"
            placeholder="Description (Optional)"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <button type="submit" className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Add Income
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2 text-center">Income Records</h2>
          {incomeRecords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomeRecords.map((income, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <p className="text-gray-600 text-sm">{income.date}</p>
                  <h3 className="text-lg font-bold text-green-800">{income.source}</h3>
                  <p className="text-gray-700 text-sm">{income.description || "No description provided"}</p>
                  <p className="text-green-600 font-semibold mt-2 text-lg">${income.amount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No income records added yet.</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Print Income Statements
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatements;