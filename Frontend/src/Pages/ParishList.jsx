import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaArrowLeft } from "react-icons/fa";

const ParishList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/parish")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Error fetching members:", err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Parish Members List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Full Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Role</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member._id} className="border-b">
                    <td className="p-3">{member.fullName}</td>
                    <td className="p-3">{member.age}</td>
                    <td className="p-3">{member.role}</td>
                    <td className="p-3">{member.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No parish members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {/* Back to Parish Directory Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Parish Directory
          </button>

          {/* View Youth Members Button */}
          <button
            onClick={() => navigate("/virtualid")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FaUsers /> Youth Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParishList;
