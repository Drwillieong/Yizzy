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
        <h1 className="text-2xl md:text-4xl font-extrabold">Wash It Izzy!</h1>
        <div className="flex items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full mr-3"></div>
          <span className="text-sm md:text-lg font-semibold">Laundry Shop Owner</span>
          <button
            onClick={handleLogout}
            className="ml-4 md:ml-6 bg-red-500 text-white p-1 md:p-2 rounded-md hover:bg-red-600 transition-all text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 flex flex-col">
          <nav>
            <ul>
              <li className="flex items-center p-2 md:p-3 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaListAlt className="mr-2 md:mr-3" />
                <span className="text-sm md:text-base">Order Management</span>
              </li>
              <li className="flex items-center p-2 md:p-3 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaHistory className="mr-2 md:mr-3" />
                <span className="text-sm md:text-base">History</span>
              </li>
              <li className="flex items-center p-2 md:p-3 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaCog className="mr-2 md:mr-3" />
                <span className="text-sm md:text-base">Setting</span>
              </li>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-auto flex items-center bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-red-600 transition text-sm md:text-base"
          >
            <FiLogOut className="mr-2" />
            Log Out
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white shadow-md p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <FaListAlt className="text-gray-700 text-xl mr-2" />
              <span className="text-gray-700 font-semibold text-sm md:text-base">Total Orders:</span>
            </div>
            <div className="flex items-center">
              <AiOutlineClockCircle className="text-yellow-500 text-xl mr-2" />
              <span className="text-gray-700 font-semibold text-sm md:text-base">Pending Orders:</span>
            </div>
            <div className="flex items-center">
              <MdCheckCircle className="text-green-500 text-xl mr-2" />
              <span className="text-gray-700 font-semibold text-sm md:text-base">Completed Orders:</span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow-md p-4 rounded-lg overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-gray-700 font-semibold text-lg mb-2 md:mb-0">Orders</h2>
              <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded-md w-full md:w-1/3"
              />
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border text-sm md:text-base">Order ID</th>
                  <th className="p-2 border text-sm md:text-base">Name</th>
                  <th className="p-2 border text-sm md:text-base">Contact/Email</th>
                  <th className="p-2 border text-sm md:text-base">Kilo</th>
                  <th className="p-2 border text-sm md:text-base">Status</th>
                  <th className="p-2 border text-sm md:text-base">Date</th>
                  <th className="p-2 border text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700 text-center">
                  <td className="p-2 border text-sm md:text-base">1</td>
                  <td className="p-2 border text-sm md:text-base">Jairus Pecho</td>
                  <td className="p-2 border text-sm md:text-base">09624227215</td>
                  <td className="p-2 border text-sm md:text-base">7kg</td>
                  <td className="p-2 border text-yellow-500 font-semibold text-sm md:text-base">Drying</td>
                  <td className="p-2 border text-sm md:text-base">02/6/25</td>
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