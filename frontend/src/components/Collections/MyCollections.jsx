import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollectionCard from './CollectionCard';
import AddCollectionModal from './AddCollectionModal';

const MyCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get('/api/collections');
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections', error);
    }
  };

  return (
    <div>
      <h1>My Collections</h1>
      <button onClick={() => setShowAddModal(true)}>Add Collection</button>
      <div className="collections-grid">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
      {showAddModal && (
        <AddCollectionModal
          onClose={() => setShowAddModal(false)}
          onSave={fetchCollections}
        />
      )}
    </div>
  );
};

export default MyCollectionsPage;
