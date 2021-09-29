import actionTypes from 'App/constants/actionTypes';

const defaultState = {apiKey: ''};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_WEATHER_API:
      return action.payload;
    default:
      return state;
  }
};
