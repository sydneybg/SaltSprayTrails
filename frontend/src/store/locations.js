import { csrfFetch } from './csrf';

// Constants
const SET_LOCATIONS = 'locations/setLocations';
const SET_LOCATION = 'locations/setLocation';
const REMOVE_LOCATION = 'locations/removeLocation';
const SET_USER_LOCATIONS = 'locations/setUserLocations';


// Action Creators
export const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  payload: locations,
});

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});

export const removeLocation = (locationId) => ({
    type: REMOVE_LOCATION,
    payload: locationId,
  });

  export const setUserLocations = (locations) => ({
    type: SET_USER_LOCATIONS,
    payload: locations,
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
    // locationData.type = locationData.activity_type;
    const response = await csrfFetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

export const deleteUserLocation = (locationId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/locations/${locationId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(removeLocation(locationId));
      }
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  export const fetchUserLocations = () => async (dispatch) => {
    try {
      const response = await csrfFetch('/api/locations/current');
      const data = await response.json();
      dispatch(setUserLocations(data.locations));
    } catch (error) {
      console.error('Error fetching user locations:', error);
    }
  };


// Reducer
const initialState = { locations: [], currentLocation: null, userLocations: [] };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return { ...state, locations: action.payload };
    case SET_USER_LOCATIONS:
      return { ...state, userLocations: action.payload };
    case SET_LOCATION:
      return { ...state, currentLocation: action.payload };
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.payload),
        userLocations: state.userLocations.filter(location => location.id !== action.payload),
      };
    default:
      return state;
  }
};

export default locationsReducer;
