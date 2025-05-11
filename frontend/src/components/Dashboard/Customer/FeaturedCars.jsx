import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCars.css';

const FeaturedCars = ({ cars }) => {
  const featuredCars = cars.slice(0, 4);

  return (
    <div className="featured-cars">
      <div className="featured-cars-header">
        <h2>Featured Cars</h2>
        <Link to="/cars" className="view-all-button">
          View All <span className="arrow">→</span>
        </Link>
      </div>
      <div className="featured-cars-grid">
        {featuredCars.map(car => (
          <div key={car.id} className="featured-car-card">
            <img src={car.image} alt={car.name} className="featured-car-image" />
            <div className="featured-car-details">
              <h3>{car.name}</h3>
              <p>Brand: {car.brand}</p>
              <p>Type: {car.type}</p>
              <p>Price: ${car.price}/day</p>
              {typeof car.availableCount !== 'undefined' && (
                <p className="car-available-count">Available: {car.availableCount}</p>
              )}
              {car.availableCount > 0 ? (
                <Link to={`/book-car/${car.id}`} className="book-button">
                  Book Now
                </Link>
              ) : (
                <button className="book-button" disabled style={{background: '#ccc', cursor: 'not-allowed'}}>Unavailable</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars; 