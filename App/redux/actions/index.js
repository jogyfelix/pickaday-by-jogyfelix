export const setUserDetails = userDetail => {
  return {
    type: 'set_user',
    payload: userDetail,
  };
};
