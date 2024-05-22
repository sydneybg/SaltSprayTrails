import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLocation } from '../../store/locations';

const LocationDetail = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const location = useSelector((state) => state.locations.currentLocation);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchLocation(locationId));
  }, [dispatch, locationId]);

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
      <p>{location.description}</p>
      {/* Render other location details */}
      {/* Add edit and delete buttons */}
    </div>
  );
};

export default LocationDetail;
