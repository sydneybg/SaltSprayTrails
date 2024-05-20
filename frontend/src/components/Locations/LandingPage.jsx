import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../store/locations'
import { Link } from 'react-router-dom';
import './LandingPage.css';
import largeImage from '../../../../images/LandingPageLargeImage.png'

const LandingPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <div className="large-image-container">
        <img src={largeImage} alt="Large Image" className="large-image" />
      </div>
      <h1>Welcome to Salt'n'Swim!</h1>
      <div className="locations-grid">
        {locations.map((location) => (
          <Link to={`/locations/${location.id}`} key={location.id} className="location-tile">
            <div className="location-image">
              <img src={location.image} alt={location.name} />
            </div>
            <div className="location-details">
              <h2>{location.name}</h2>
              <p>{location.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
