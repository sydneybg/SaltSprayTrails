import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections, addLocationToCollection } from '../../store/collections';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';

const AddToCollectionModal = ({ location, onClose }) => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const [selectedCollection, setSelectedCollection] = useState('');

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleAddToCollection = () => {
    dispatch(addLocationToCollection(selectedCollection, location));
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add {location.name} to Collection</h2>
      <select
        value={selectedCollection}
        onChange={(e) => setSelectedCollection(e.target.value)}
      >
        <option value="" disabled>Select a collection</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddToCollection}>Add to Collection</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddToCollectionModal;
