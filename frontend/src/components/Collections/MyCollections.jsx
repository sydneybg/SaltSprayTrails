import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserCollections, deleteCollection } from '../../store/collections';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';

const MyCollections = () => {
  const dispatch = useDispatch();

  const userCollections = useSelector(state => state.collections.userCollections);

  useEffect(() => {
    dispatch(fetchUserCollections());
  }, [dispatch]);

  const handleDelete = (collectionId) => {
    dispatch(deleteCollection(collectionId));
  };

  if (!userCollections) {
    return <div>Loading...</div>;
  }


  return (
    <div className="my-collections-page">
      <h1>My Collections</h1>
      <Link to="/collections/new" className="create-collection-button">Create Collection</Link>
      <div className="collections-grid">
        {userCollections.map(collection => (
          <div key={collection.id} className="collection-tile">
            <div className="collection-image">
              <img src={collection.image} alt={collection.name} />
            </div>
            <div className="collection-details">
              <Link to={`/collections/${collection.id}`}><h2>{collection.name}</h2></Link>
              {/* <p>{collection.locations.length} locations</p> */}

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
        ))}
      </div>
    </div>
  );
};

export default MyCollections;
