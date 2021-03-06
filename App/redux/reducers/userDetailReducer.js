import actionTypes from 'App/constants/actionTypes';

const defaultState = {email: '', uid: ''};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
