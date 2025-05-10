import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = ({ children, title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>{title}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 