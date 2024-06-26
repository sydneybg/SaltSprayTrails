import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import locationsReducer from './locations';
import collectionsReducer from './collections';

const rootReducer = combineReducers({
  session: sessionReducer,
  locations: locationsReducer,
  collections: collectionsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// const configureStore = (preloadedState) => {
//   const store = createStore(rootReducer, preloadedState, enhancer);

//   if(process.env.NODE_ENV !== 'production') {
//     window.store = store;
//   }

// return store;
// };

export default configureStore;
