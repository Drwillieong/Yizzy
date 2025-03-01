import React from "react";
import { useNavigate } from 'react-router-dom';
import LaundrySection from "./ServiesSection";
import LaundryService from "./LaundryService";

const HomePage = () => {

  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking'); // Navigate to the BookingAndTracking component
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Log in component
  };

  
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-pink-500 p-5 flex justify-between items-center text-white shadow-lg">
      <h1 className="text-3xl font-extrabold">Wash It Izzy</h1>
        <div className="space-x-6">
          <a href="#contact" className="hover:underline font-bold">Service </a>
          <a href="#contact" className="hover:underline font-bold">Contact</a>
          <button onClick={handleLoginClick} className="bg-white text-pink-400 px-4 py-2 rounded-lg ml-0">Login</button>
        </div>
      </nav>
      

       {/* Hero Section */}
       <div id="" className="relative text-left py-35 px-10 bg-cover bg-center flex items-center" style={{ backgroundImage: "url('/loundry BG.webp')" }}>
        <div className="max-w-3xl">
          <h1 className="text-6xl font-extrabold italic  text-white">EVERY LAUNDRY MAKES A DIFFERENCE</h1>
          <p className="mt-4 text-lg text-white">We offer drop-off, self-service, pick-up & delivery, and dry-cleaning services to make laundry day Izzy-ier for you.</p>
          <div  onClick={handleBookingClick} className="mt-6 flex rounded-4xl">
            <div className="bg-white text-black px-6 py-3 rounded-l-4xl border-r-2  shadow-md font-medium">Pick up Tonight</div>
            <div className="bg-white text-black px-6 py-3 rounded-r-4xl shadow-md font-medium flex items-center">Where Add address<span className="ml-2 bg-pink-400 text-white p-2 rounded-full">➝</span></div>
          </div>
        </div>
      </div>
        <LaundryService></LaundryService>
        <LaundrySection></LaundrySection>
      

        {/* About our fees section */}
<div className="bg-white py-1 px-4 md:px-8 lg:px-12">
  
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About our fees</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Service Fee Card */}
      <div className="border border-pink-300 rounded-xl p-6 shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-2">Service fee</h3>
        <p className="text-gray-700">
          28 pesos per kilo for regular clothes, or 199 pesos for 7 kilos or
          less. Detergent and fabric conditioner are included.
        </p>
      </div>

      {/* Free Pickup & Delivery Card */}
      <div className="border border-pink-300 rounded-xl p-6 shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-2">FREE Pickup & Delivery</h3>
        <p className="text-gray-700">
          Free pickup/delivery (2+ loads) in Calamba: 7-10 AM & 5-7 PM.
          Covers listed barangays & nearby areas.
        </p>
      </div>

      {/* Payment Card */}
      <div className="border border-pink-300 rounded-xl p-6 shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-2">Payment</h3>
        <p className="text-gray-700">
          We offer convenient payment options, accepting both cash and GCash, and
          payment is due upon pickup.
        </p>
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand & About */}
          <div>
            <h3 className="text-xl font-bold">Wash It Izzy</h3>
            <p className="mt-2 text-gray-400">God will provide.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <p className="mt-2 text-gray-400">Email: washitizzy@email.com</p>
            <p className="text-gray-400">Phone: 123456789</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-8">
          &copy; 2025 Wash It Izzy - All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
