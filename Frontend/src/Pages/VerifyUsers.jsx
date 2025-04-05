import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../Services/VerifyUserService";


const VerifyUsers = () => {
  const queryClient = useQueryClient();

  // Fetch unverified users
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["unverifiedUsers"],
    queryFn: userService.getUnverifiedUsers,
  });

  // Mutation to verify a user
  const verifyMutation = useMutation({
    mutationFn: userService.verifyUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["unverifiedUsers"]);
      alert("User verified successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to verify user");
    },
  });

  const handleVerify = (userId) => {
    verifyMutation.mutate(userId);
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading unverified users...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center">
        {error.message || "Failed to load unverified users."}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Verify Unverified Users
      </h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No unverified users found.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="text-red-600">Unverified</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleVerify(user._id)}
                      disabled={verifyMutation.isLoading}
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
                    >
                      {verifyMutation.isLoading && verifyMutation.variables === user._id
                        ? "Verifying..."
                        : "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifyUsers;