import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/Homepage/HomePage"; 
import BookingAndTracking from "./components/BookingAndTracking";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking" element={<BookingAndTracking />} />
    
      
    </Routes>
  </Router>
  );
}

export default App;
