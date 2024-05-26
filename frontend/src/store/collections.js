import { csrfFetch } from "./csrf";

// Constants
const SET_COLLECTIONS = "collections/setCollections";
const SET_COLLECTION = "collections/setCollection";
const REMOVE_COLLECTION = "collections/removeCollection";
const ADD_LOCATION_TO_COLLECTION = "collections/addLocationToCollection";
const REMOVE_LOCATION_FROM_COLLECTION = "collections/removeLocationFromCollection";
const SET_USER_COLLECTIONS = "collections/setUserCollections";
const SET_ERROR_MESSAGE = "collections/setErrorMessage";

// Action Creators
export const setCollections = (collections) => ({
  type: SET_COLLECTIONS,
  payload: collections,
});

export const setCollection = (collection) => ({
  type: SET_COLLECTION,
  payload: collection,
});

export const removeCollection = (collectionId) => ({
  type: REMOVE_COLLECTION,
  payload: collectionId,
});

export const setUserCollections = (collections) => ({
  type: SET_USER_COLLECTIONS,
  payload: collections,
});

export const addLocationToCollection = (collectionId, location) => ({
    type: ADD_LOCATION_TO_COLLECTION,
    payload: { collectionId, location },
  });

  export const removeLocationFromCollection = (collectionId, locationId) => ({
    type: REMOVE_LOCATION_FROM_COLLECTION,
    payload: { collectionId, locationId },
  });

export const setErrorMessage = (errorMessage) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage,
});

// Thunk Action Creators
export const fetchCollections = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/collections");
    const data = await response.json();
    dispatch(setCollections(data.collections));
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

export const fetchCollection = (collectionId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/collections/${collectionId}`);
    const data = await response.json();
    dispatch(setCollection(data));
  } catch (error) {
    console.error("Error fetching collection:", error);
  }
};

export const fetchUserCollections = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/collections/current");
    const data = await response.json();
    dispatch(setUserCollections(data.collections));
  } catch (error) {
    console.error("Error fetching user collections:", error);
  }
};

export const createCollection = (collectionData) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectionData),
    });
    const data = await response.json();
    dispatch(setCollection(data));
    return data;
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
};

export const updateCollection =
  (collectionId, collectionData) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/collections/${collectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectionData),
      });
      const data = await response.json();
      dispatch(setCollection(data));
      return data;
    } catch (error) {
      console.error("Error updating collection:", error);
      throw error;
    }
  };

export const deleteCollection = (collectionId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/collections/${collectionId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeCollection(collectionId));
    }
  } catch (error) {
    console.error("Error deleting collection:", error);
  }
};

export const addLocationToCollectionThunk = (collectionId, location) => async (dispatch) => {
    try {
      const response = await csrfFetch(
        `/api/collections/${collectionId}/locations/${location.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      dispatch(addLocationToCollection(collectionId, data));
    } catch (error) {
      console.error("Error adding location to collection:", error);
    }
  };

  export const removeLocationFromCollectionThunk = (collectionId, locationId) => async (dispatch) => {
    try {
      const response = await csrfFetch(
        `/api/collections/${collectionId}/locations/${locationId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        dispatch(removeLocationFromCollection(collectionId, locationId));
        dispatch(fetchCollection(collectionId));
      }
    } catch (error) {
      console.error("Error removing location from collection:", error);
    }
  };

// Reducer
const initialState = {
  collections: [],
  userCollections: [],
  errorMessage: "",
  currentCollection: null,
};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTIONS:
      return { ...state, collections: action.payload };
    case SET_COLLECTION:
      return { ...state, currentCollection: action.payload };
    case SET_USER_COLLECTIONS:
      return { ...state, userCollections: action.payload };

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case REMOVE_COLLECTION:
      console.log('in remove collection', action.payload, typeof action.payload)
      console.log(state.collections)
      console.log(state)

      return {
        ...state,
        userCollections: state.userCollections.filter(
          (collection) => collection.id !== action.payload
        ),
      };
    case ADD_LOCATION_TO_COLLECTION:
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.id === action.payload.collectionId
            ? {
                ...collection,
                locations: [...collection.locations, action.payload.location],
              }
            : collection
        ),
      };
    case REMOVE_LOCATION_FROM_COLLECTION:
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.id === action.payload.collectionId
            ? {
                ...collection,
                locations: collection.locations.filter(
                  (location) => location.id !== action.payload.locationId
                ),
              }
            : collection
        ),
      };
    default:
      return state;
  }
};

export default collectionsReducer;
