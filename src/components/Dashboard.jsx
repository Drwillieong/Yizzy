import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { FiLogOut, FiEdit, FiTrash2 } from "react-icons/fi";
import { FaListAlt, FaHistory, FaCog } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-pink-500 p-5 flex justify-between items-center text-white shadow-lg w-full">
        <h1 className="text-4xl font-extrabold">Wash It Izzy!</h1>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <span className="text-lg font-semibold">Laundry Shop Owner</span>
          <button
            onClick={handleLogout}
            className="ml-6 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col min-h-screen">
          <nav>
            <ul>
              <li className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaListAlt className="mr-3" />
                Order Management
              </li>
              <li className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaHistory className="mr-3" />
                History
              </li>
              <li className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaCog className="mr-3" />
                Setting
              </li>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            <FiLogOut className="mr-2" />
            Log Out
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Order Summary */}
          <div className="grid grid-cols-3 gap-4 bg-white shadow-md p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <FaListAlt className="text-gray-700 text-xl mr-2" />
              <span className="text-gray-700 font-semibold">Total Orders:</span>
            </div>
            <div className="flex items-center">
              <AiOutlineClockCircle className="text-yellow-500 text-xl mr-2" />
              <span className="text-gray-700 font-semibold">Pending Orders:</span>
            </div>
            <div className="flex items-center">
              <MdCheckCircle className="text-green-500 text-xl mr-2" />
              <span className="text-gray-700 font-semibold">Completed Orders:</span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-700 font-semibold text-lg">Orders</h2>
              <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded-md w-1/3"
              />
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Contact/Email</th>
                  <th className="p-2 border">Kilo</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700 text-center">
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">Jairus Pecho</td>
                  <td className="p-2 border">09624227215</td>
                  <td className="p-2 border">7kg</td>
                  <td className="p-2 border text-yellow-500 font-semibold">Drying</td>
                  <td className="p-2 border">02/6/25</td>
                  <td className="p-2 border">
                    <button className="text-blue-500 p-1 hover:text-blue-700">
                      <FiEdit />
                    </button>
                    <button className="text-red-500 p-1 hover:text-red-700 ml-2">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
