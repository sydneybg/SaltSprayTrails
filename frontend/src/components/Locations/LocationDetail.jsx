import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchLocation, setLocation } from '../../store/locations';


const LocationDetail = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const location = useSelector((state) => state.locations.currentLocation);

  console.log(location)

  useEffect(() => {
    dispatch(fetchLocation(locationId));
  }, [dispatch, locationId]);

useEffect(()=> {
  return ()=>{
    dispatch(setLocation(null))
  }
}, [dispatch]);

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="location-detail-page">
      <h1>{location.name}</h1>
      <div className="location-details">
        <div className="location-image">
          <img src={(location && location.locationImages)?location.locationImages[0]?.imageUrl:''} alt={location.name} />
        </div>
        <div className="location-info">
          <p><strong>Description:</strong> {location.description}</p>
          <p><strong>Activity Type:</strong> {location.activity_type}</p>
          <p><strong>Address:</strong> {location.street}, {location.city}, {location.state}, {location.country}, {location.zip_code}</p>
          <p><strong>Coordinates:</strong> {location.latitude}, {location.longitude}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
