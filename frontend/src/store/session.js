import { csrfFetch } from './csrf';

// Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// Action Creators
const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user
    };
  };

  const removeUser = () => {
    return {
      type: REMOVE_USER
    };
  };

// Thunk Action Creator
//Login
// export const login = (user) => async (dispatch) => {
//     const { credential, password } = user;
//     const response = await csrfFetch("/api/session", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         credential,
//         password
//       })
//     });
//     if(response.ok) {
//         const data = await response.json();
//         dispatch(setUser(data));
//       } else if (response.status < 500) {
//         const errorMessages = await response.json();
//         return errorMessages
//       } else {
//         return { server: "Something went wrong. Please try again" }
//       }
//   };

export const login = ({credential, password}) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    console.log('response ', response)
    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data.user));
      return data
    }
    const error = new Error()
    error.data = response
    throw error
  };

  //Restore User
  export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    console.log('data   ', data)
    dispatch(setUser(data.user));
    return response;
  };

//Signup
// export const signup = (user) => async (dispatch) => {
//     const { username, firstName, lastName, email, password } = user;
//     const response = await csrfFetch("/api/users", {
//       method: "POST",
//       body: JSON.stringify({
//         username,
//         firstName,
//         lastName,
//         email,
//         password
//       })
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
//   };

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//Logout
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };


// Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
