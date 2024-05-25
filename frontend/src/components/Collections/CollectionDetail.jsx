import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCollection, removeLocation } from '../../store/collections';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';
import './CollectionDetails.css';


const CollectionDetail = () => {
  const dispatch = useDispatch();
  const { collectionId } = useParams();
  const collection = useSelector((state) => state.collections.currentCollection);


  useEffect(() => {
    dispatch(fetchCollection(collectionId));
  }, [dispatch, collectionId]);


  const handleRemoveLocation = async (locationId) => {
    if (collectionId && locationId) {
    await dispatch(removeLocation(collectionId, locationId));
    dispatch(fetchCollection(collectionId));
  }  else {
    console.error('Invalid collectionId or locationId', { collectionId, locationId });
  }
  };

  if (!collection) {
    return <div>No Collections Created Yet</div>;
  };

  return (
    <div className="collection-detail-page">
    <div className="collection-header">
      <img src={collection.imageUrl} alt={collection.name} className="collection-image" />
      <h1>{collection.name}</h1>
    </div>
    <h2>Locations in this Collection</h2>
    {collection.Locations.length === 0 ? (
      <div>No Locations Added to Collection At This Time</div>
    ) : (
      <div className="locations-grid">
        {collection.Locations.map(location => (
          <div key={location.id} className="location-tile">
            <div className="location-image">
              <img src={location.image} alt={location.name} />
            </div>
            <div className="location-details">
              <Link to={`/locations/${location.id}`}><h2>{location.name}</h2></Link>
              <p>{location.description}</p>

              <OpenModalButton
                buttonText="Remove Location"
                modalComponent={
                  <DeleteConfirmationModal
                    onDelete={() => handleRemoveLocation(location.id)}
                    itemName={location.name}
                    itemType="location"
                  />
                }
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};


export default CollectionDetail;
