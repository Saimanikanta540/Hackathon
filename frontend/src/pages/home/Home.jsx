import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCars from '../../components/Dashboard/Customer/FeaturedCars';
import './Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Ride</h1>
            <p className="hero-subtitle">Choose from our wide range of vehicles for your next adventure</p>
            <div className="hero-cta">
              <Link to="/cars" className="btn btn-primary btn-lg">Browse Cars</Link>
              <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>Experience the best car rental service with our premium features</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Wide Selection</h3>
              <p>Choose from various car types and models to match your needs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tags"></i>
              </div>
              <h3>Best Prices</h3>
              <p>Competitive rates and transparent pricing with no hidden fees</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Quality Service</h3>
              <p>Well-maintained vehicles and excellent customer support</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Booking</h3>
              <p>Safe and easy booking process with instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>Explore our most popular vehicles</p>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading cars...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          ) : (
            <FeaturedCars cars={cars} />
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Rent a car in three simple steps</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Choose Your Car</h3>
                <p>Browse our extensive collection and select your preferred vehicle</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Book Online</h3>
                <p>Select your dates and complete the booking process securely</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Pick Up & Drive</h3>
                <p>Collect your car and enjoy your journey with peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section bg-primary">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book your car now and enjoy our special offers</p>
            <Link to="/cars" className="btn btn-light btn-lg">Book Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 