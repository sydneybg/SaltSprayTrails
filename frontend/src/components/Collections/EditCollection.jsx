import { useState, useEffect } from 'react';
import axios from 'axios';

const EditCollectionModal = ({ collection, onClose, onSave }) => {
  const [name, setName] = useState(collection.name);
  const [imageUrl, setImageUrl] = useState(collection.imageUrl);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/collections/${collection.id}`, { name, imageUrl });
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating collection', error);
    }
  };

  const handleAddLocation = async (locationId) => {
    try {
      await axios.post('/api/collection-locations', { collectionId: collection.id, locationId });
      onSave();
    } catch (error) {
      console.error('Error adding location to collection', error);
    }
  };

  const handleRemoveLocation = async (locationId) => {
    try {
      const collectionLocation = collection.collectionLocations.find(cl => cl.locationId === locationId);
      await axios.delete(`/api/collection-locations/${collectionLocation.id}`);
      onSave();
    } catch (error) {
      console.error('Error removing location from collection', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <button type="submit">Save Collection</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
      <h2>Locations</h2>
      <div className="locations-grid">
        {collection.locations.map((location) => (
          <div key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <button onClick={() => handleRemoveLocation(location.id)}>Remove</button>
          </div>
        ))}
      </div>
      <h2>Add Location</h2>
      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <button onClick={() => handleAddLocation(location.id)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCollectionModal;
