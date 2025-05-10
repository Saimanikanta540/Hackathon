import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import SystemOverview from '../../components/Dashboard/Admin/SystemOverview';
import UserManagement from '../../components/Dashboard/Admin/UserManagement';
import RecentBookings from '../../components/Dashboard/Admin/RecentBookings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'Admin') {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all users
      const usersResponse = await fetch('http://localhost:8080/api/users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch all cars
      const carsResponse = await fetch('http://localhost:8080/api/cars');
      const carsData = await carsResponse.json();
      setCars(carsData);

      // Fetch all bookings
      const bookingsResponse = await fetch('http://localhost:8080/api/bookings');
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(u => u.id !== userId));
        }
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const stats = {
    totalUsers: users.length,
    totalCars: cars.length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter(b => b.status === 'Confirmed').length
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <SystemOverview stats={stats} />
      <UserManagement users={users} onDeleteUser={handleDeleteUser} />
      <RecentBookings bookings={bookings} />
    </DashboardLayout>
  );
};

export default AdminDashboard; 