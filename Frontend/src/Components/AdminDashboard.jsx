import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { logout } from "../Redux/UserSlice";
import { getDecodeData } from "../Utiles/storageHandler";
import { getBloodDonorsAPI } from "../Services/bloodDonarService";

import VirtualID from "../Pages/VirtualID";
import QuizForm from "../Pages/QuizForm";
import AdminReports from "../Pages/AdminReports";
import ViewPetitions from "../Pages/ViewPetitions";
import ParishDirectory from "../Pages/ParishDirectory";
import FamilyUnitForm from "../Pages/FamilyUnitForm";
import ImageGalleryUpload from "../Pages/ImageGalleryUpload";
import QuizForms from "../Pages/QuizForms";

const AdminDashboard = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [reportsDropdown, setReportsDropdown] = useState(false);

  const [showVirtualID, setShowVirtualID] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showPetitions, setShowPetitions] = useState(false);
  const [showParishDirectory, setShowParishDirectory] = useState(false);
  const [showFamilyUnit, setShowFamilyUnit] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [showBloodDonors, setShowBloodDonors] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    navigate("/");

    setTimeout(() => {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
        navigate("/");
      });
    }, 0);
  };

  // Fetch blood donors data
  const { data: donors, isLoading, isError, error } = useQuery({
    queryFn: getBloodDonorsAPI,
    queryKey: ["view-blood-donors"],
  });

  const decodedUser = getDecodeData();
  const userEmail = decodedUser?.email || "Not Available";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
          <h2 className="text-xl font-bold text-center py-4">Church Admin</h2>
          <nav className="space-y-2">
            <Link className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded" to="/admin-dashboard">
              🏠 <span>Dashboard</span>
            </Link>
            <div>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex justify-between w-full p-3 hover:bg-gray-700 rounded"
              >
                <span className="flex items-center space-x-3">👥 <span>User Management</span></span> ▼
              </button>
              {userDropdown && (
                <div className="ml-5 space-y-2">
                  <Link className="block p-2 hover:bg-gray-700 rounded" to="/admin/users">All Users</Link>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowBloodDonors(true)}>
                    Blood Donors
                  </button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowVirtualID(true)}>Virtual ID</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowParishDirectory(true)}>Parish Directory</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowFamilyUnit(true)}>Family Unit</button>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setReportsDropdown(!reportsDropdown)}
                className="flex justify-between w-full p-3 hover:bg-gray-700 rounded"
              >
                <span className="flex items-center space-x-3">📄 <span>Reports</span></span> ▼
              </button>
              {reportsDropdown && (
                <div className="ml-5 space-y-2">
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowReports(true)}>View Reports</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowQuiz(true)}>Quizzes</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowPetitions(true)}>View Petitions</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => setShowAddQuiz(true)}>Add Quiz</button>
                </div>
              )}
            </div>
            <button
              className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded w-full text-left"
              onClick={() => setShowImageGallery(true)}
            >
              🖼️ <span>Image Upload Gallery</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>
            <div className="flex space-x-4 items-center">
              <input type="text" placeholder="🔍 Search..." className="pl-4 pr-4 py-2 border rounded-lg focus:outline-none" />
              🔔
              👤
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                🚪 Logout
              </button>
            </div>
          </div>

          <div className="p-6 flex-1">
            {showVirtualID && <VirtualID />}
            {showQuiz && <QuizForm />}
            {showReports && <AdminReports />}
            {showPetitions && <ViewPetitions />}
            {showParishDirectory && <ParishDirectory />}
            {showFamilyUnit && <FamilyUnitForm />}
            {showImageGallery && <ImageGalleryUpload />}
            {showAddQuiz && <QuizForms />}

            {/* Blood Donors List */}
            {showBloodDonors && (
              <div className="bg-white p-6 rounded-lg shadow-lg border border-red-300 mt-6">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Blood Donors List</h2>
                {isLoading && <p className="text-center text-gray-600">Loading donors...</p>}
                {isError && <p className="text-center text-red-500">{error.message}</p>}
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-red-500 text-white">
                    <tr>
                      <th className="p-3 border border-gray-300">Name</th>
                      <th className="p-3 border border-gray-300">Blood Type</th>
                      <th className="p-3 border border-gray-300">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors?.map((donor) => (
                      <tr key={donor.id} className="text-center">
                        <td className="p-3 border border-gray-300">{donor.name}</td>
                        <td className="p-3 border border-gray-300 text-red-600 font-bold">{donor.bloodType}</td>
                        <td className="p-3 border border-gray-300">{donor.contactNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
