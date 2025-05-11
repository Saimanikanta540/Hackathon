import React from 'react';
import './About.css';

const About = () => (
  <div className="about-container">
    <div className="about-hero">
      <div className="about-hero-content">
        <h1>About Us</h1>
        <p>Experience the pinnacle of luxury car rentals. Our brand is dedicated to providing an elite, seamless, and memorable journey for every customer. With a curated fleet of premium vehicles and world-class service, we redefine what it means to drive in style.</p>
      </div>
    </div>
    
    <div className="about-sections">
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>To deliver an unparalleled car rental experience, blending luxury, comfort, and convenience for discerning clients.</p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-car"></i>
            <h3>Exclusive Fleet</h3>
            <p>Premium selection of luxury vehicles</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-concierge-bell"></i>
            <h3>Personalized Service</h3>
            <p>Tailored concierge experience</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-tag"></i>
            <h3>Transparent Pricing</h3>
            <p>No hidden fees or surprises</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Always here when you need us</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Safety First</h3>
            <p>Impeccable safety standards</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default About; 