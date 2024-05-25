import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCollection, addLocation, removeLocationFromCollection } from '../../store/collections';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';

const CollectionDetail = () => {
  const dispatch = useDispatch();
  const { collectionId } = useParams();
  const collection = useSelector((state) => state.collections.currentCollection);

  console.log(collection)

  useEffect(() => {
    dispatch(fetchCollection(collectionId));
  }, [dispatch, collectionId]);

  if (!collection) {
    return <div>Loading...</div>;
  }

  const handleRemoveLocation = (locationId) => {
    dispatch(removeLocationFromCollection(collectionId, locationId));
  };


  return (
    <div>
      <h1>{collection.name}</h1>
      <img src={collection.imageUrl} alt={collection.name} />
      <h2>Locations in this Collection</h2>
      <ul>
        {collection.Locations.map(location => (
          <li key={location.id}>
            <Link to={`/locations/${location.id}`}>{location.name}</Link>
            <button onClick={() => handleRemoveLocation(location.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* <h2>Add Location to Collection</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            <span>{location.name}</span>
            <button onClick={() => handleAddLocation(location.id)}>Add to Collection</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CollectionDetail;
