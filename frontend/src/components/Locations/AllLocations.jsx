import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../store/locations';


const AllLocations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div>
      <h1>All Locations</h1>
      {locations.map((location) => (
        <div key={location.id}>
          <h2>{location.name}</h2>
          <p>{location.description}</p>

        </div>
      ))}
    </div>
  );
};

export default AllLocations;
