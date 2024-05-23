import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationCard from '../locations/LocationCard';
import EditCollectionModal from './EditCollectionModal';

const CollectionDetailsPage = ({ match }) => {
  const { collectionId } = match.params;
  const [collection, setCollection] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCollectionDetails();
  }, [collectionId]);

  const fetchCollectionDetails = async () => {
    try {
      const response = await axios.get(`/api/collections/${collectionId}`);
      setCollection(response.data);
    } catch (error) {
      console.error('Error fetching collection details', error);
    }
  };

  if (!collection) return <div>Loading...</div>;

  return (
    <div>
      <h1>{collection.name}</h1>
      <button onClick={() => setShowEditModal(true)}>Edit Collection</button>
      <div className="locations-grid">
        {collection.locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      {showEditModal && (
        <EditCollectionModal
          collection={collection}
          onClose={() => setShowEditModal(false)}
          onSave={fetchCollectionDetails}
        />
      )}
    </div>
  );
};

export default CollectionDetailsPage;
