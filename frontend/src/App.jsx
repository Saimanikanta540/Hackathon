import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CustomerDashboard from './pages/customerDashboard/CustomerDashboard';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import Cars from './pages/cars/Cars';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/poppins';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;