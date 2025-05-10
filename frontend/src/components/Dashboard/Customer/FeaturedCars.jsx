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
              <Link to={`/book-car/${car.id}`} className="book-button">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars; 