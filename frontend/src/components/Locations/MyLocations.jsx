import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserLocations, deleteUserLocation } from '../../store/locations';
import LocationForm from './LocationForm';
import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';

const MyLocations = () => {
  const dispatch = useDispatch();
  const userLocations = useSelector(state => state.locations.userLocations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editLocation, setEditLocation] = useState(null);

  useEffect(() => {
    dispatch(fetchUserLocations());
  }, [dispatch]);

  const handleDelete = (locationId) => {
    dispatch(deleteUserLocation(locationId));
    setIsModalOpen(false);
  };

  const openDeleteModal = (locationId) => {
    setCurrentLocationId(locationId);
    setIsModalOpen(true);
  };

  const openEditForm = (location) => {
    setEditLocation(location);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setEditLocation(null);
  };

  return (
    <div className="my-locations-page">
      <h1>My Locations</h1>
      <button onClick={() => setFormVisible(true)} className="create-location-button">Create Location</button>
      <div className="locations-grid">
        {userLocations.map(location => (
          <div key={location.id} className="location-tile">
            <div className="location-image">
              <img src={location.image} alt={location.name} />
            </div>
            <div className="location-details">
              <h2>{location.name}</h2>
              <p>{location.description}</p>
              <button onClick={() => openEditForm(location)}>Edit</button>
              <button onClick={() => openDeleteModal(location.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {formVisible && <LocationForm location={editLocation} onClose={closeForm} />}
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={() => handleDelete(currentLocationId)}
          itemName={userLocations.find(loc => loc.id === currentLocationId)?.name}
          itemType="location"
        />
      )}
    </div>
  );
};

export default MyLocations;
