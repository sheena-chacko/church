import React, { useState } from "react";
import { FaHandHoldingHeart, FaSearch } from "react-icons/fa";

const DonatorsList = () => {
  const [search, setSearch] = useState("");

  const donators = [
    { id: 1, name: "John Doe", amount: "$500", date: "2024-02-01"},
    { id: 2, name: "Jane Smith", amount: "$300", date: "2024-02-10" },
    { id: 3, name: "Michael Johnson", amount: "$700", date: "2024-02-15" },
  ];

  const filteredDonators = donators.filter((donator) =>
    donator.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 flex justify-center items-center gap-2">
          <FaHandHoldingHeart className="text-yellow-600" /> Donators List
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We appreciate the generosity of our donors who contribute to the church’s mission.
        </p>

        <div className="mb-6 flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search donor..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <FaSearch />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-gray-50 border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-yellow-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonators.length > 0 ? (
                filteredDonators.map((donator, index) => (
                  <tr
                    key={donator.id}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-yellow-100 transition`}
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">{donator.name}</td>
                    <td className="py-4 px-6 font-semibold text-green-700">{donator.amount}</td>
                    <td className="py-4 px-6 text-gray-600">{donator.date}</td>
                    <td className="py-4 px-6 font-semibold text-red-600">{donator.bloodGroup}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No donors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonatorsList;
