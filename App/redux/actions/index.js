import actionTypes from 'App/constants/actionTypes';

export const setUserDetails = userDetail => {
  return {
    type: actionTypes.SET_USER,
    payload: userDetail,
  };
};

export const setWeatherApiKey = apiKey => {
  return {
    type: actionTypes.SET_WEATHER_API,
    payload: apiKey,
  };
};

export const getWeatherKey = () => {
  return {
    type: actionTypes.GET_WEATHER_API,
  };
};
