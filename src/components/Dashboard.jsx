// src/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality later
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <nav className="bg-pink-500 p-5 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-4xl font-extrabold"> Wash It Izzy!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-pink-500">Hello po</h2>
        <p className="text-gray-700 mt-3"></p>
      </div>
    </div>
  );
};

export default Dashboard;