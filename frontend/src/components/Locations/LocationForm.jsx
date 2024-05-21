import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createLocation, updateLocation } from '../../store/locations';

const LocationForm = ({ location, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activity_type: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    ...location
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    setFormData(location ? location : {
      name: '',
      description: '',
      activity_type: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      latitude: '',
      longitude: ''
    });
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let action;

    if (location) {
      action = updateLocation(location.id, formData);
    } else {
      action = createLocation(formData);
    }
    const resultAction = await dispatch(action);
    if (resultAction.error) {
      setErrors(resultAction.error);
    } else {
      onClose(); 
    }
  };

  return (
    <div className="location-form">
      <h2>{location ? 'Edit Location' : 'Create Location'}</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="activity_type" placeholder="Activity Type" value={formData.activity_type} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="zip_code" placeholder="Zip Code" value={formData.zip_code} onChange={handleChange} required />
        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
        <button type="submit">{location ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default LocationForm;
