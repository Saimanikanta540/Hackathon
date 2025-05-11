import React from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableCars = ({ cars }) => {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section">
      <h2>Available Cars</h2>
      <div className="cars-grid">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-details">
              <h3>{car.name}</h3>
              <p>Brand: {car.brand}</p>
              <p>Type: {car.type}</p>
              <p>Price: ${car.price}/day</p>
              {typeof car.availableCount !== 'undefined' && (
                <p className="car-available-count">Available: {car.availableCount}</p>
              )}
              {car.availableCount > 0 ? (
                <button 
                  onClick={() => navigate(`/book-car/${car.id}`)}
                  className="book-button"
                >
                  Book Now
                </button>
              ) : (
                <button className="book-button" disabled style={{background: '#ccc', cursor: 'not-allowed'}}>Unavailable</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableCars; 