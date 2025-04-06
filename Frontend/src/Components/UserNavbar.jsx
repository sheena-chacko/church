import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice"; // Adjust path based on your project

const UserNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch Redux logout action
    sessionStorage.removeItem("userToken"); // Clear auth token
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-400">
          Nexus Church
        </div>
        <ul className="flex space-x-6">
          <li><Link to="/user-home" className="hover:text-yellow-400 transition">Dashboard</Link></li>
          {/* <li><Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link></li> */}
          <li><Link to="/view-events" className="hover:text-yellow-400 transition">Events</Link></li>
  
          <li><Link to="/settings" className="hover:text-yellow-400 transition">Settings</Link></li>
          <li><Link to="/Donation2" className="hover:text-yellow-400 transition">Donation</Link></li>
          <li><Link to="/virtualid" className="hover:text-yellow-400 transition">ID cards</Link></li>
          <li><Link to="/parish-directory" className="hover:text-yellow-400 transition">Parish Directory</Link></li>
          <li><Link to="/reports" className="hover:text-yellow-400 transition">Reports</Link></li>
          <li><Link to="/donators-list" className="hover:text-yellow-400 transition">Donators List</Link></li>
          <li><Link to="/gallery" className="hover:text-yellow-400 transition"> Gallery</Link></li>
          <li><Link to="/quiz-form" className="hover:text-yellow-400 transition"> View Quizz Form</Link></li>
          <li><Link to="/add" className="hover:text-yellow-400 transition">Petition</Link></li>
          {/* <li><Link to="/view" className="hover:text-yellow-400 transition">View Petition</Link></li> */}
          <li><Link to="/blood-donation" className="hover:text-yellow-400 transition">Blood Donation Form</Link></li>
          <li><Link to="/view-blooddonation" className="hover:text-yellow-400 transition"> View Blood Donation</Link></li>

          <li>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-400 transition bg-transparent border-none text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
