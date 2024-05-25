import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../store/locations";
import { addLocation } from '../../store/collections';

import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import { LoginFormModal } from '../LoginFormModal/LoginFormModal';
// import { SignupFormModal } from '../SignupFormModal/SignupFormModal';
import AddLocationToCollection from '../Collections/AddLocationToCollection';
import "./LandingPage.css";
import DeleteConfirmationModal from "../DeleteModal/DeleteConfirmationModal";


const AllLocations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);


  const handleAddToCollection = (collection, location) => {
    if (sessionUser) {
      dispatch(addLocation(collection.id, location))
    } else {
      alert("Please log in or sign up to add locations to collections.");
    }
  };


  return (
    <div className="landing-page">
      <h1>All Locations</h1>
      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.id} className="location-tile">
            <Link to={`/locations/${location.id}`} className="location-link">
              <div className="location-image">
                <img src={location.image} alt={location.name} />
              </div>
              <div className="location-details">
                <h2>{location.name}</h2>
                <p>{location.description}</p>
              </div>
            </Link>
            {sessionUser && (<OpenModalButton
                buttonText="Add Location To Collection"
                modalComponent={
                  <AddLocationToCollection
                    location={location}
                    onAdd={handleAddToCollection}
                    itemName={location.name}
                    itemType="location"
                  />
                }
              />
                )}
            {/* {sessionUser && (
              <button onClick={() => handleAddToCollection(location)}>
                Add to Collection
              </button>
            )} */}
          </div>
        ))}
      </div>
      {/* {showModal && (
        <AddToCollectionModal
          location={selectedLocation}
          onClose={() => setShowModal(false)}
        />
      )} */}
    </div>
  );
};

export default AllLocations;
