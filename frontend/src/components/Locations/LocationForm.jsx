import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createLocation, updateLocation, fetchLocation } from '../../store/locations';
import './LocationForm.css'

const LocationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locationId } = useParams();
  const currentLocation = useSelector((state) => state.locations.currentLocation);

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
    longitude: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (locationId) {
      dispatch(fetchLocation(locationId));
    } else {
      setFormData({
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
      });
    }
  }, [locationId, dispatch]);

  useEffect(() => {
    if (currentLocation) {
      setFormData(currentLocation);
    }
  }, [currentLocation]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let action;

    if (locationId) {
      action = updateLocation({ id: locationId, ...formData });
    } else {
      action = createLocation(formData);
    }

    console.log(action)
    try {
      const resultAction = await dispatch(action);
      console.log(resultAction) //undefined but still not seeing catch error
      if (resultAction.errors) {
        setErrors(resultAction.errors);
      } else {
        navigate(`/locations/${resultAction.id}`);
      }
    } catch (error) {
      console.error('Error submitting location:', error);
    }
  };

  return (
    <div className="location-form">
      <h2>{locationId ? 'Edit Location' : 'Create Location'}</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      {errors.name && <p className="error">{errors.name}</p>}

        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        {errors.description && <p className="error">{errors.description}</p>}

        <select name="activity_type" value={formData.activity_type} onChange={handleChange} required>
          <option value="" disabled>Select Activity Type</option>
          <option value="swimming">Swimming</option>
          <option value="surfing">Surfing</option>
          <option value="rafting">Rafting</option>
          <option value="kayaking">Kayaking</option>
        </select>
        {errors.activity_type && <p className="error">{errors.activity_type}</p>}

        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        {errors.street && <p className="error">{errors.street}</p>}

        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        {errors.city && <p className="error">{errors.city}</p>}

        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        {errors.state && <p className="error">{errors.state}</p>}

        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        {errors.country && <p className="error">{errors.country}</p>}

        <input type="text" name="zip_code" placeholder="Zip Code" value={formData.zip_code} onChange={handleChange} required />
        {errors.zip_code && <p className="error">{errors.zip_code}</p>}

        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
        {errors.latitude && <p className="error">{errors.latitude}</p>}

        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
        {errors.longitude && <p className="error">{errors.longitude}</p>}

        <button type="submit">{locationId ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default LocationForm;
