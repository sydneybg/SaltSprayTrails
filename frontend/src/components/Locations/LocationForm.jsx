import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLocation, updateLocation } from '../store/locations'; // Assuming you have createLocation and updateLocation action creators

const LocationForm = ({ location, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(location || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      dispatch(updateLocation(location.id, formData));
    } else {
      dispatch(createLocation(formData));
    }
    onClose();
  };

  return (
    <div>
      <h2>{location ? 'Edit Location' : 'Create Location'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Render form fields for location data */}
        <button type="submit">{location ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default LocationForm;
