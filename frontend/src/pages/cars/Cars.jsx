import React, { useEffect, useState } from 'react';
import './Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars');
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const carTypes = Array.from(new Set(cars.map(car => car.type)));
  const carStatuses = Array.from(new Set(cars.map(car => car.status)));

  const filteredCars = cars.filter(car => {
    return (
      (typeFilter ? car.type === typeFilter : true) &&
      (statusFilter ? car.status === statusFilter : true)
    );
  });

  return (
    <div className="cars-page">
      <h1 className="cars-title">Browse Cars</h1>
      <div className="cars-filter-bar">
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          {carTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {carStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="cars-loading">Loading cars...</div>
      ) : error ? (
        <div className="cars-error">{error}</div>
      ) : (
        <div className="cars-grid">
          {filteredCars.length === 0 ? (
            <div className="cars-empty">No cars found.</div>
          ) : (
            filteredCars.map(car => (
              <div className="car-card" key={car.id}>
                <img src={car.image} alt={car.name} className="car-image" />
                <div className="car-info">
                  <h2 className="car-name">{car.name}</h2>
                  <p className="car-brand">Brand: {car.brand}</p>
                  <p className="car-type">Type: {car.type}</p>
                  <p className="car-price">Price: <span>${car.price}/day</span></p>
                  <p className={`car-status ${car.status.toLowerCase()}`}>Status: {car.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Cars; 