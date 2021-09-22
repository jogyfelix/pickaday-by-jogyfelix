import Geolocation from '@react-native-community/geolocation';

export const getLocation = () => {
  const promise = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => reject(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
  return promise;
};
