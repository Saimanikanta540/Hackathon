import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookCar.css';

const BookCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [showTimeout, setShowTimeout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Debug log
  useEffect(() => {
    console.log('BookCar debug:', { id, car, loading, error });
  }, [id, car, loading, error]);

  // Show loading spinner if loading takes too long
  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => setShowTimeout(true), 2000);
    } else {
      setShowTimeout(false);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    if (!id) {
      setError('No car selected. Please go back and choose a car to book.');
      setLoading(false);
      return;
    }
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/${id}`);
        if (!response.ok) throw new Error('Car not found');
        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname), { replace: true });
    }
  }, [navigate]);

  // Calculate total price when dates change
  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalPrice(days * car.price);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car]);

  const validateDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start < tomorrow) {
      setError('Start date must be tomorrow or later');
      return false;
    }
    
    if (end <= start) {
      setError('End date must be after start date');
      return false;
    }
    
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      setError('Booking must be for at least one day');
      return false;
    }
    
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    if (!validateDates()) return;
    setStep(2);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingStatus('');
    setError('');
    
    if (!validateDates()) return;
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setBookingStatus('Please log in to book a car.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          car: { id: car.id },
          customer: { id: user.id },
          startDate: startDate + 'T00:00:00.000Z', // Add time component for proper parsing
          endDate: endDate + 'T00:00:00.000Z', // Add time component for proper parsing
          totalPrice,
          status: 'Pending',
        }),
      });

      if (response.ok) {
        setBookingStatus('Booking successful! Redirecting...');
        setTimeout(() => navigate('/customer/dashboard'), 1500);
      } else {
        const data = await response.json();
        setBookingStatus('Booking failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      setBookingStatus('Booking failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="bookcar-page">
        <div className="bookcar-card">
          <div className="bookcar-loading">
            Loading car details...
            {showTimeout && <div style={{marginTop: '1rem', color: '#ef4444'}}>This is taking longer than usual. Please check your connection or try again later.</div>}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookcar-page">
        <div className="bookcar-card">
          <div className="bookcar-error">{error}</div>
          <button className="bookcar-btn" onClick={() => navigate('/cars')}>Go to Cars</button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bookcar-page">
        <div className="bookcar-card">
          <div className="bookcar-error">Car not found. Please go back and select a car to book.</div>
          <button className="bookcar-btn" onClick={() => navigate('/cars')}>Go to Cars</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bookcar-page">
      <div className="bookcar-card">
        <img src={car.image} alt={car.name} className="bookcar-image" />
        <div className="bookcar-details">
          <h1>{car.name}</h1>
          <p>Price: <span>${car.price}/day</span></p>
        </div>
        {step === 1 && (
          <form className="bookcar-form" onSubmit={handleNext}>
            <div className="bookcar-form-group">
              <label>Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                min={getTomorrowDate()}
                required 
              />
            </div>
            <div className="bookcar-form-group">
              <label>End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                min={startDate || getTomorrowDate()}
                required 
              />
            </div>
            {error && <div className="bookcar-error">{error}</div>}
            <button type="submit" className="bookcar-btn">Next</button>
          </form>
        )}
        {step === 2 && (
          <form className="bookcar-form" onSubmit={handleBooking}>
            <div className="bookcar-summary">
              <p><strong>Car:</strong> {car.name}</p>
              <p><strong>From:</strong> {new Date(startDate).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(endDate).toLocaleDateString()}</p>
              <p><strong>Price per day:</strong> ${car.price}</p>
              <p><strong>Total price:</strong> ${totalPrice}</p>
            </div>
            <button type="submit" className="bookcar-btn">Confirm Booking</button>
            <button type="button" className="bookcar-btn-secondary" onClick={() => setStep(1)} style={{marginLeft:'1rem'}}>Back</button>
            {bookingStatus && <div className={bookingStatus.includes('success') ? 'bookcar-success' : 'bookcar-error'}>{bookingStatus}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default BookCar; 