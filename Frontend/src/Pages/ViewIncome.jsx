import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTransactionsAPI, deleteTransactionAPI } from "../Services/transactionService";

const ViewIncome = () => {
  const queryClient = useQueryClient();

  const { data: incomes = [], isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAPI,
    select: (data) => data.filter((item) => item.type === "income"),
  });

  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("✅ Income deleted");
    },
    onError: (error) => {
      alert(error.message || "❌ Failed to delete");
    },
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
        Income List
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading income records...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load income records</p>
        ) : incomes.length === 0 ? (
          <p className="text-gray-500 text-center">No income records found.</p>
        ) : (
          <ul className="space-y-4">
            {incomes.map((income) => (
              <li
                key={income._id}
                className="flex justify-between items-center border-b py-3 hover:bg-gray-100 transition rounded-md px-2"
              >
                <span className="text-gray-700 font-medium">
                  {income.category} -{" "}
                  <span className="text-green-600">${income.amount}</span> (
                  {new Date(income.transactionDate).toLocaleDateString()})
                </span>
                <button
                  onClick={() => deleteTransaction.mutate(income._id)}
                  className="px-4 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={deleteTransaction.isLoading}
                >
                  {deleteTransaction.isLoading ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewIncome;
