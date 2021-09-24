import {combineReducers} from 'redux';
import userDetailReducer from './userDetailReducer';

export default combineReducers({
  userDetails: userDetailReducer,
});
