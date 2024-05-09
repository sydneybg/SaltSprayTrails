import configureStore from './store';
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
  
});

export default configureStore;
