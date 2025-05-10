import React from 'react';
import './BookingHistory.css';

const BookingHistory = ({ bookings }) => {
  return (
    <section className="dashboard-section">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.car.name}</h3>
              <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Status: <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></p>
              <p>Total Price: ${booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookingHistory; 