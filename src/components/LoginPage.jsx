import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Import Firebase auth and Firestore
import { doc, getDoc } from "firebase/firestore"; // For fetching user roles
import { useNavigate } from "react-router-dom"; // For navigation

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        // Redirect based on role
        if (userRole === "admin") {
          alert("Admin login successful! Redirecting to dashboard...");
          navigate("/dashboard"); // Redirect to admin dashboard
        } else if (userRole === "customer") {
          alert("Customer login successful! Redirecting to your personal page...");
          navigate("/booking"); // Redirect to customer personal page
        } else {
          setError("Invalid user role.");
        }
      } else {
        setError("User role not found.");
      }
    } catch (err) {
      setError(err.message);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-pink-500 p-5 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">Wash It Izzy</h1>
        <div className="space-x-6">
          <a href="/" className="hover:underline font-semibold text-lg">Home</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center mt-12 lg:mt-16 p-6">
        {/* Left side: Image and Text */}
        <div className="flex-1 p-8 hidden lg:block">
          <img
            src="src/assets/pusa.jpeg" // Replace with your shop image
            alt="Laundry Shop"
            className="w-[80%] h-[40vh] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
          />
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-pink-500">Welcome to Wash It Izzy!</h2>
            <p className="text-gray-700 mt-3">Your trusted laundry service. Login to manage orders and services.</p>
          </div>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-pink-500 mb-4">Login</h2>
          <p className="text-center text-red-500 font-semibold mb-6">For Admins and Customers</p>

          <form className="mt-4 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 transition-all"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 transition-all"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{"Log in Failed "}</p>}
            <div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white p-3 rounded-md hover:bg-pink-600 transition-all"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
   
    
    


      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold">Wash It Izzy</h3>
            <p className="mt-2 text-gray-400">God will provide.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <p className="mt-2 text-gray-400">Email: washitizzy@email.com</p>
            <p className="text-gray-400">Phone: 123456789</p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          &copy; 2025 Wash It Izzy - All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
