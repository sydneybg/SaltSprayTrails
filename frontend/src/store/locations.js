import { csrfFetch } from './csrf';

// Constants
const SET_LOCATIONS = 'locations/setLocations';
const SET_LOCATION = 'locations/setLocation';

// Action Creators
export const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  payload: locations,
});

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});

// Thunk Action Creators
export const fetchLocations = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/locations');
    const data = await response.json();
    dispatch(setLocations(data.locations));
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

export const fetchLocation = (locationId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/locations/${locationId}`);
    const data = await response.json();
    dispatch(setLocation(data));
  } catch (error) {
    console.error('Error fetching location:', error);
  }
};

export const createLocation = (locationData) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/locations', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
    const data = await response.json();
    dispatch(setLocation(data));
  } catch (error) {
    console.error('Error creating location:', error);
  }
};

export const updateLocation = (locationId, locationData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/locations/${locationId}`, {
      method: 'PUT',
      body: JSON.stringify(locationData),
    });
    const data = await response.json();
    dispatch(setLocation(data));
  } catch (error) {
    console.error('Error updating location:', error);
  }
};

// Reducer
const initialState = { locations: [], currentLocation: null };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return { ...state, locations: action.payload };
    case SET_LOCATION:
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

export default locationsReducer;
