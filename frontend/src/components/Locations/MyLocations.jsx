import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserLocations, deleteUserLocation } from "../../store/locations";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteConfirmationModal from "../DeleteModal/DeleteConfirmationModal";

const MyLocations = () => {
  const dispatch = useDispatch();
  const userLocations = useSelector((state) => state.locations.userLocations);

  useEffect(() => {
    dispatch(fetchUserLocations());
  }, [dispatch]);

  const handleDelete = (locationId) => {
    dispatch(deleteUserLocation(locationId));
  };

  return (
    <div className="my-locations-page">
      <h1>My Locations</h1>
      <Link to="/locations/new" className="create-button">
        Create Location
      </Link>
      <div className="grid locations-grid">
        {userLocations.map((location) => (
          <div key={location.id} className="tile location-tile">
            <div className="image-container location-image">
              <img src={location.locationImages[0]?.imageUrl || ''} alt={location.name} />
            </div>
            <div className="details location-details">
              <Link to={`/locations/${location.id}`}>
                <h2>{location.name}</h2>
              </Link>
              <p>{location.description}</p>
              <div className="button-container">
                <Link to={`/locations/${location.id}/edit`}>Edit</Link>
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteConfirmationModal
                      onDelete={() => handleDelete(location.id)}
                      itemName={location.name}
                      itemType="location"
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

export default MyLocations;
