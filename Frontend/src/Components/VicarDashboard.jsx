import React from "react";
import { Link } from "react-router-dom";
import { FileText, FileSearch, Home } from "lucide-react";

const VicarDashboard = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/public/church4.jpeg')" }}
    >
      <div className="backdrop-blur-sm bg-white/70 p-8 rounded-xl shadow-xl max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">
          Vicar Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Petitions */}
          <Link to="/view">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">View Petitions</h3>
              <p className="text-gray-600 text-sm mt-1">
                Check and review submitted petitions.
              </p>
            </div>
          </Link>

          {/* Reports */}
          <Link to="/balance-sheet">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <FileSearch className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">View Reports</h3>
              <p className="text-gray-600 text-sm mt-1">
                Access financial and community reports.
              </p>
            </div>
          </Link>
           {/* parish List */}
           <Link to="/parish-list">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <FileSearch className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">View Parish Directory</h3>
              <p className="text-gray-600 text-sm mt-1">
                Access Parish Members List.
              </p>
            </div>
          </Link>

          {/* Home */}
          <Link to="/">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <Home className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">Go to Home</h3>
              <p className="text-gray-600 text-sm mt-1">
                Return to the main homepage.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VicarDashboard;
