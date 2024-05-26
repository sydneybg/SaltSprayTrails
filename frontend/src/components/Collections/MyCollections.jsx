import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserCollections, deleteCollection } from '../../store/collections';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';
import './MyCollections.css';

const MyCollections = () => {
  const dispatch = useDispatch();

  const userCollections = useSelector(state => state.collections.userCollections);

  useEffect(() => {
    dispatch(fetchUserCollections());
  }, [dispatch]);

  const handleDelete = (collectionId) => {
    dispatch(deleteCollection(collectionId));
    // dispatch(fetchUserCollections())
  };

  if (!userCollections) {
    return <div>Loading...</div>;
  }


  return (
    <div className="page my-collections-page">
      <h1>My Collections</h1>
      <Link to="/collections/new" className="create-button">Create Collection</Link>
      <div className="grid collections-grid">
        {userCollections.map(collection => (
          <div key={collection.id} className="tile collection-tile">
            <div className="image-container collection-image">
              <img src={collection.image} alt={collection.name} />
            </div>
            <div className="details collection-details">
              <Link to={`/collections/${collection.id}`}><h2>{collection.name}</h2></Link>
              <div className="button-container">
                <Link to={`/collections/${collection.id}/edit`}>Edit</Link>
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteConfirmationModal
                      onDelete={() => handleDelete(collection.id)}
                      itemName={collection.name}
                      itemType="collection"
                    />
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollections;
