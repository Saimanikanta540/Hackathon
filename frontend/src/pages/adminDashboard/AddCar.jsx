import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/Dashboard/Admin/CarManagement.css';

const initialCarForm = {
  name: '',
  brand: '',
  type: '',
  color: '',
  fuelType: '',
  price: '',
  image: '',
  status: 'Available',
  availableCount: ''
};

const fuelTypeOptions = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID'];
const statusOptions = ['Available', 'Booked', 'Maintenance', 'Unavailable'];

const AddCar = () => {
  const navigate = useNavigate();
  const [carForm, setCarForm] = useState(initialCarForm);
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'availableCount') {
      const numValue = Number(value);
      if (numValue < 0) return;
    }
    setCarForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (Number(carForm.price) <= 0) {
      setAddError('Price must be greater than 0');
      return false;
    }
    if (Number(carForm.availableCount) <= 0) {
      setAddError('Available count must be greater than 0');
      return false;
    }
    if (!carForm.fuelType) {
      setAddError('Please select a fuel type');
      return false;
    }
    if (!carForm.status) {
      setAddError('Please select a status');
      return false;
    }
    return true;
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setAddLoading(true);
    setAddError('');
    setAddSuccess(false);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:8080/api/cars/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...carForm,
          price: Number(carForm.price),
          ownerId: Number(user.id),
          availableCount: Number(carForm.availableCount)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add car');
      }

      setAddSuccess(true);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      setAddError(err.message || 'Failed to add car. Please try again.');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="car-management" style={{maxWidth: 480, margin: '2rem auto'}}>
      <h2>Add New Car</h2>
      <form className="add-car-form" onSubmit={handleAddCar}>
        <div className="form-group">
          <label>Car Name</label>
          <input 
            name="name" 
            value={carForm.name} 
            onChange={handleFormChange} 
            placeholder="Enter car name" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input 
            name="brand" 
            value={carForm.brand} 
            onChange={handleFormChange} 
            placeholder="Enter brand name" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <input 
            name="type" 
            value={carForm.type} 
            onChange={handleFormChange} 
            placeholder="Enter car type (e.g. Sedan, SUV)" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <input 
            name="color" 
            value={carForm.color} 
            onChange={handleFormChange} 
            placeholder="Enter car color" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Fuel Type</label>
          <select 
            name="fuelType" 
            value={carForm.fuelType} 
            onChange={handleFormChange} 
            required
            className="form-select"
          >
            <option value="">Select Fuel Type</option>
            {fuelTypeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price per Day</label>
          <input 
            name="price" 
            value={carForm.price} 
            onChange={handleFormChange} 
            placeholder="Enter price per day" 
            type="number" 
            min="0" 
            step="0.01"
            required 
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input 
            name="image" 
            value={carForm.image} 
            onChange={handleFormChange} 
            placeholder="Enter image URL" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select 
            name="status" 
            value={carForm.status} 
            onChange={handleFormChange} 
            required
            className="form-select"
          >
            <option value="">Select Status</option>
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Available Count</label>
          <input 
            name="availableCount" 
            value={carForm.availableCount} 
            onChange={handleFormChange} 
            placeholder="Enter available count" 
            type="number" 
            min="0" 
            required 
          />
        </div>

        {addError && <div className="error">{addError}</div>}
        {addSuccess && <div className="bookcar-success" style={{marginBottom:8}}>Car added successfully!</div>}
        
        <div className="form-group">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={addLoading}
          >
            {addLoading ? 'Adding...' : 'Add Car'}
          </button>
        </div>

        <div className="form-group">
          <button 
            type="button" 
            className="submit-btn" 
            style={{
              background:'#f1f5f9',
              color:'#2563eb',
              border:'1px solid #2563eb',
              marginTop:8
            }} 
            onClick={()=>navigate('/admin/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar; 