import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  createLocation,
  updateLocation,
  fetchLocation,
  setErrorMessage,
  setLocation,
} from "../../store/locations";

function isValidHttpUrl(string) {
  const pattern =
    /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_]*)?$/i;
  return pattern.test(string);
}

const LocationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locationId } = useParams();
  const location = useLocation();

  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const errorMessage = useSelector((state) => state.locations.errorMessage);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    activity_type: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (locationId) {
      dispatch(fetchLocation(locationId));
    } else {
      setFormData({
        name: "",
        description: "",
        activity_type: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
      });
    }
  }, [locationId, dispatch]);

  useEffect(() => {
    const isEdit = location.pathname.includes("edit");
    if (currentLocation && isEdit) {
      setFormData(currentLocation);
    }
  }, [currentLocation, location]);

  useEffect(() => {
    return () => {
      dispatch(setLocation(null));
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let actionResult;

    if (locationId) {
      actionResult = await dispatch(
        updateLocation({ id: locationId, ...formData })
      );
      if (actionResult) {
        navigate(`/locations/${currentLocation.id}`);
      }
    } else {
      if (!formData.imageUrl || !isValidHttpUrl(formData.imageUrl)) {
        dispatch(
          setErrorMessage("Image Url is required and must be a valid Url")
        );
        return;
      }
      actionResult = await dispatch(createLocation(formData));
      if (actionResult) {
        navigate(`/my-locations`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">
        {locationId ? "Edit Location" : "Create Location"}
      </h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Activity Type:
          <select
            name="activity_type"
            value={formData.activity_type}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Select Activity Type
            </option>
            <option value="swimming">Swimming</option>
            <option value="surfing">Surfing</option>
            <option value="rafting">Rafting</option>
            <option value="kayaking">Kayaking</option>
          </select>
        </label>

        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Zip Code:
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Latitude:
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        <label>
          Longitude:
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        {!locationId && (
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              maxLength="255"
              className="form-input"
            />
          </label>
        )}

        <button type="submit" className="form-button">
          {locationId ? "Update" : "Create"}
        </button>
      </form>
      <div className="form-error">{errorMessage}</div>
    </div>
  );
};

export default LocationForm;
