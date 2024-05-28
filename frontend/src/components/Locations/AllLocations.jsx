import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../store/locations";
import { addLocationToCollectionThunk } from '../../store/collections';

import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import AddLocationToCollection from '../Collections/AddLocationToCollection';
import "./LandingPage.css";

const AllLocations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleAddToCollection = (collection, location) => {
    if (sessionUser) {
      dispatch(addLocationToCollectionThunk(collection.id, location));
    } else {
      alert("Please log in or sign up to add locations to collections.");
    }
  };

  return (
    <div className="landing-page">
      <h1>All Locations</h1>
      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.id} className="tile location-tile">
            <Link to={`/locations/${location.id}`} className="location-link">
              <div className="location-image">
                <img src={location.locationImages[0]?.imageUrl || ''} alt={location.name} />
              </div>
              <div className="location-details">
                <h2>{location.name}</h2>
                <p>{location.description}</p>
              </div>
            </Link>
            {sessionUser && (
              <div className="button-container">
              <OpenModalButton
                buttonText="Add Location To Collection"
                buttonClass="add-button"
                modalComponent={
                  <AddLocationToCollection
                    location={location}
                    onAdd={handleAddToCollection}
                    itemName={location.name}
                    itemType="location"
                  />
                }
              />
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLocations;
