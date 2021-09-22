import axios from 'axios';

export const getLocationDetails = async (lat, long) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`;
  axios.interceptors.response.use(commonSuccess, commonError);
  return await axios.get(url);
};

const commonSuccess = response => {
  return response;
};

const commonError = error => {
  return Promise.reject(error);
};

export const getweatherDetails = async (lat, long) => {
  const apiKey = '0af55644ab7397fc781a05b7ebd1508d';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.interceptors.response.use(commonSuccess, commonError);
  return await axios.get(url);
};
