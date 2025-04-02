import React, { useState } from "react";

const FinancialReports = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    type: "Income",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.amount) {
      alert("Date and Amount are required!");
      return;
    }
    setReports([...reports, formData]);
    setFormData({ date: "", type: "Income", amount: "", description: "" });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Financial Reports
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount ($)"
            className="border p-3 rounded w-full"
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (Optional)"
            className="border p-3 rounded w-full"
          />

          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Report
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2 text-center">
            Report Records
          </h2>
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-md ${
                    report.type === "Income"
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "bg-red-50 border-l-4 border-red-500"
                  }`}
                >
                  <p className="text-gray-600 text-sm">{report.date}</p>
                  <h3
                    className={`text-lg font-bold ${
                      report.type === "Income" ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {report.type}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {report.description || "No description provided"}
                  </p>
                  <p
                    className={`font-semibold mt-2 text-lg ${
                      report.type === "Income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${report.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No financial records available.</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Print Financial Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
