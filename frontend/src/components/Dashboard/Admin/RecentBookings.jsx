import React from 'react';

const RecentBookings = ({ bookings }) => {
  return (
    <section className="dashboard-section">
      <h2>Recent Bookings</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 5).map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer.name}</td>
                <td>{booking.car.name}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentBookings; 