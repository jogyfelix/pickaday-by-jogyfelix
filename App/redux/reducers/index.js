import {combineReducers} from 'redux';
import userDetailReducer from './userDetailReducer';
import weatherApiKeyReducer from './weatherApiKeyReducer';

export default combineReducers({
  userDetails: userDetailReducer,
  weatherApiKey: weatherApiKeyReducer,
});
