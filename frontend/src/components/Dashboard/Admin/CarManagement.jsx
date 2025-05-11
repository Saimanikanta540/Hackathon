import React, { useState } from 'react';
import './CarManagement.css';

const initialCarForm = {
  name: '',
  brand: '',
  type: '',
  color: '',
  fuelType: '',
  price: '',
  image: '',
  status: 'Available',
};

const CarManagement = ({ cars, onDeleteCar, onUpdateStatus, onAddCar }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [carForm, setCarForm] = useState(initialCarForm);
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCar(null);
  };

  const handleDelete = (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      onDeleteCar(carId);
    }
  };

  const handleStatusUpdate = (carId, newStatus) => {
    onUpdateStatus(carId, newStatus);
  };

  const handleOpenAddModal = () => {
    setCarForm(initialCarForm);
    setAddError('');
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setAddError('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCarForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      const { ownerId, ...carData } = carForm;
      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });
      if (!response.ok) throw new Error('Failed to add car');
      setShowAddModal(false);
      setCarForm(initialCarForm);
      if (onAddCar) onAddCar();
    } catch (err) {
      setAddError('Failed to add car. Please try again.');
    } finally {
      setAddLoading(false);
    }
  };

  const getUniqueOptions = (arr, key) => Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));

  // Option lists
  const brandOptions = getUniqueOptions(cars, 'brand');
  const typeOptions = getUniqueOptions(cars, 'type');
  const colorOptions = getUniqueOptions(cars, 'color');
  const fuelTypeOptions = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID'];
  const statusOptions = ['Available', 'Booked', 'Maintenance', 'Unavailable'];

  return (
    <div className="car-management">
      <h2>Car Management</h2>
      <button className="add-car-btn" onClick={handleOpenAddModal}>Add Car</button>
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image small" />
            <div className="car-info">
              <h3>{car.name}</h3>
              <div className="car-info-details-container">
                <div className="car-info-details">
                  <p><strong>Brand:</strong> {car.brand}</p>
                  <p><strong>Type:</strong> {car.type}</p>
                  <p><strong>Color:</strong> {car.color}</p>
                </div>
                <div className="car-info-details">
                  <p><strong>Fuel:</strong> {car.fuelType}</p>
                  <p><strong>Price:</strong> ${car.price}/day</p>
                  <p><strong>Status:</strong> {car.status}</p>
                </div>
              </div>
              <div className="car-actions">
                <button onClick={() => handleViewDetails(car)} className="view-btn">
                  View Details
                </button>
                <button onClick={() => handleDelete(car.id)} className="delete-btn">
                  Delete
                </button>
                <select
                  value={car.status}
                  onChange={(e) => handleStatusUpdate(car.id, e.target.value)}
                  className="status-select"
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedCar && (
        <div className="car-details-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseDetails}>×</button>
            <h2>Car Details</h2>
            <img src={selectedCar.image} alt={selectedCar.name} className="detail-image" />
            <div className="details-info">
              <p><strong>Name:</strong> {selectedCar.name}</p>
              <p><strong>Brand:</strong> {selectedCar.brand}</p>
              <p><strong>Type:</strong> {selectedCar.type}</p>
              <p><strong>Color:</strong> {selectedCar.color}</p>
              <p><strong>Fuel Type:</strong> {selectedCar.fuelType}</p>
              <p><strong>Price:</strong> ${selectedCar.price}/day</p>
              <p><strong>Status:</strong> {selectedCar.status}</p>
              <p><strong>Owner ID:</strong> {selectedCar.ownerId}</p>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="car-details-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseAddModal}>×</button>
            <h2>Add New Car</h2>
            <form className="add-car-form" onSubmit={handleAddCar}>
              <input name="name" value={carForm.name} onChange={handleFormChange} placeholder="Name" required />
              <select name="brand" value={carForm.brand} onChange={handleFormChange} required>
                <option value="">Select Brand</option>
                {brandOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="type" value={carForm.type} onChange={handleFormChange} required>
                <option value="">Select Type</option>
                {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="color" value={carForm.color} onChange={handleFormChange} required>
                <option value="">Select Color</option>
                {colorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <select name="fuelType" value={carForm.fuelType} onChange={handleFormChange} required>
                <option value="">Select Fuel Type</option>
                {fuelTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <input name="price" value={carForm.price} onChange={handleFormChange} placeholder="Price" type="number" min="0" required />
              <input name="image" value={carForm.image} onChange={handleFormChange} placeholder="Image URL" required />
              <select name="status" value={carForm.status} onChange={handleFormChange} required>
                <option value="">Select Status</option>
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {addError && <div className="error">{addError}</div>}
              <button type="submit" className="submit-btn" disabled={addLoading}>{addLoading ? 'Adding...' : 'Add Car'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement; 