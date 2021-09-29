import {call, put, takeLatest} from 'redux-saga/effects';
import {setWeatherApiKey} from '../actions';
import {getWeatherApiKey} from '../../utils/apis';
import actionTypes from 'App/constants/actionTypes';

export function* getWeatherApi() {
  try {
    const response = yield call(getWeatherApiKey);
    let data = response.data();
    const result = {apiKey: data.apiKey};
    yield put(setWeatherApiKey(result));
  } catch (error) {
    alert(error);
  }
}

export const weatherApiKeySaga = [
  takeLatest(actionTypes.GET_WEATHER_API, getWeatherApi),
];
