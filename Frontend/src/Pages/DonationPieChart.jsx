// components/DonationPieChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb"];

const fetchDonationSummary = async () => {
  const res = await axios.get("/api/donations/summary");
  return res.data;
};

const DonationPieChart = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["donationSummary"],
    queryFn: fetchDonationSummary,
  });

  if (isLoading) return <p className="text-center">Loading chart...</p>;
  if (isError) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-center mb-4">Donation Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="totalAmount"
            nameKey="_id"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationPieChart;
