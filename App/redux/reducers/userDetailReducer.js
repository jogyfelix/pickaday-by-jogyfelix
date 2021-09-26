import actionTypes from 'App/constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
