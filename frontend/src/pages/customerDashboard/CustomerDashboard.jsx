import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import BookingHistory from '../../components/Dashboard/Customer/BookingHistory';
import AvailableCars from '../../components/Dashboard/Customer/AvailableCars';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchUserData(userData.id);
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      // Fetch user's bookings
      const bookingsResponse = await fetch(`http://localhost:8080/api/bookings/customer/${userId}`);
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);

      // Fetch available cars
      const carsResponse = await fetch('http://localhost:8080/api/cars');
      const carsData = await carsResponse.json();
      setAvailableCars(carsData.filter(car => car.status === 'Available'));

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <DashboardLayout title={`Welcome, ${user?.name}`}>
      <BookingHistory bookings={bookings} />
      <AvailableCars cars={availableCars} />
    </DashboardLayout>
  );
};

export default CustomerDashboard; 