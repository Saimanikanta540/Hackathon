import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' }); // Clear form
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out for bookings, support, or any inquiries about our luxury fleet and services.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <div className="contact-error">{error}</div>}
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {submitted && (
                <div className="contact-success">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for reaching out! We'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>

          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <i className="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>saimanikanta0540@gmail.com</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-phone"></i>
                <h3>Phone</h3>
                <p>+91 800 123 4567</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Address</h3>
                <p>123 Elite Avenue, Luxury City, Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 