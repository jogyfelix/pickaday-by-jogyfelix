import actionTypes from 'App/constants/actionTypes';

export const setUserDetails = userDetail => {
  return {
    type: actionTypes.SET_USER,
    payload: userDetail,
  };
};
