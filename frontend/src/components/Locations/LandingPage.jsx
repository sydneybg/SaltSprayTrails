import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../store/locations'
import { Link } from 'react-router-dom';
import './LandingPage.css';
import LandingPageLargeImage from '../../../../images/LandingPageLargeImage.png'

const LandingPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <div className="large-image-container">
        <img src={LandingPageLargeImage} alt="Landing Page" className="large-image" />
        <div className="image-text">
          Welcome to Salt & Swim
        </div>
      </div>
      <div className="locations-grid">
        {locations.map((location) => (
          <Link to={`/locations/${location.id}`} key={location.id} className="tile location-tile">
            <div className="location-image">
              <img src={location.locationImages[0]?.imageUrl || ''} alt={location.name} />
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
