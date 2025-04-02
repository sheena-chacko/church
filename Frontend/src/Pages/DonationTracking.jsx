import React, { useState } from "react";

const DonationTracking = () => {
  const [donations, setDonations] = useState([]);
  const [donor, setDonor] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");

  const handleAddDonation = (e) => {
    e.preventDefault();
    if (!donor || !date || !amount) {
      alert("Please fill in all required fields!");
      return;
    }

    const newDonation = {
      donor,
      date,
      amount: parseFloat(amount),
      notes,
    };

    setDonations([newDonation, ...donations]); // Newest donations first
    setDonor("");
    setDate("");
    setAmount("");
    setNotes("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Donation Tracking
        </h1>

        {/* Donation Form */}
        <form
          onSubmit={handleAddDonation}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Donor Name"
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
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

          <input
            type="number"
            placeholder="Donation Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
          />

          <div className="col-span-1 md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
            >
              Add Donation
            </button>
            <button
              type="button"
              onClick={() => {
                setDonor("");
                setDate("");
                setAmount("");
                setNotes("");
              }}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition w-full"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Search Donations */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by donor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded w-full max-w-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Donation List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            Donation Records
          </h2>

          {donations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donations
                .filter((donation) =>
                  donation.donor.toLowerCase().includes(search.toLowerCase())
                )
                .map((donation, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-4 rounded-lg shadow-md border-l-4 border-blue-500"
                  >
                    <p className="text-gray-600 text-sm">{donation.date}</p>
                    <h3 className="text-lg font-bold text-blue-800">
                      {donation.donor}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {donation.notes || "No notes provided"}
                    </p>
                    <p className="text-blue-600 font-semibold mt-2 text-lg">
                      ${donation.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No donations recorded yet.
            </p>
          )}
        </div>

        {/* Print Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Print Donation Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationTracking;
