import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCollection, removeLocationFromCollectionThunk } from '../../store/collections';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteConfirmationModal from '../DeleteModal/DeleteConfirmationModal';
import './CollectionDetails.css';


const CollectionDetail = () => {
  const dispatch = useDispatch();
  const { collectionId } = useParams();
  const collection = useSelector((state) => state.collections.currentCollection);

  const [localCollection, setLocalCollection] = useState(null);

  useEffect(() => {
    dispatch(fetchCollection(collectionId));
  }, [dispatch, collectionId]);

  useEffect(() => {
    setLocalCollection(collection);
  }, [collection]);

  const handleRemoveLocation = async (locationId) => {
    if (collectionId && locationId) {
        await dispatch(removeLocationFromCollectionThunk(collectionId, locationId));
        setLocalCollection((prevCollection) => ({
          ...prevCollection,
          Locations: prevCollection.Locations.filter(
            (location) => location.id !== locationId
          ),
        }));
  }  else {
    console.error('Invalid collectionId or locationId', { collectionId, locationId });
  }
  };

  if (!localCollection) {
    return <div>No Collections Created Yet</div>;
  }

  const { Locations = [] } = localCollection;

  return (
    <div className="collection-detail-page">
      <div className="collection-header">
        <img src={localCollection.imageUrl} alt={localCollection.name} className="collection-image" />
        <h1>{localCollection.name}</h1>
      </div>
      <h2>Locations in this Collection</h2>
      {Locations.length === 0 ? (
        <div>No Locations Added to Collection At This Time</div>
      ) : (
        <div className="locations-grid">
          {Locations.map((location) => (
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
