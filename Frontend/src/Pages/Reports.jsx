import React, { useState } from "react";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: "Annual Financial Report",
      date: "2024-01-01",
      file: "/reports/annual-report.pdf",
      description:
        "This report provides a comprehensive overview of the church's financial status for the year, including income, expenses, and donations received.",
      data: [
        { category: "Income", amount: "$5000" },
        { category: "Donations", amount: "$3000" },
        { category: "Expenses", amount: "$2000" },
      ],
    },
    {
      id: 2,
      title: "Community Outreach Report",
      date: "2024-02-10",
      file: "/reports/community-outreach.pdf",
      description:
        "The Community Outreach Report details the various programs and initiatives undertaken by the church to support the community, including charity events and volunteer activities.",
      data: [
        { category: "Fundraising", amount: "$4000" },
        { category: "Event Costs", amount: "$1500" },
        { category: "Donations", amount: "$2500" },
      ],
    },
  ];

  const handleView = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Church Reports
        </h1>
        <p className="text-center text-gray-600 mb-8">
          View and download our latest reports detailing church activities and finances.
        </p>

        <ul className="space-y-6">
          {reports.map((report) => (
            <li
              key={report.id}
              className="p-6 bg-gray-50 shadow-md rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{report.title}</h2>
                <p className="text-gray-600">Published on: {report.date}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleView(report)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View
                </button>
                <a
                  href={report.file}
                  download
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              {selectedReport.title}
            </h2>
            <p className="text-gray-700 text-lg text-center mb-6 leading-relaxed">
              {selectedReport.description}
            </p>

            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md p-4 bg-gray-50">
              <h3 className="text-xl font-bold text-center mb-4">Financial Summary</h3>
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReport.data.map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
