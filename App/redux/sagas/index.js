import {all} from 'redux-saga/effects';
import {weatherApiKeySaga} from '../sagas/weatherApiKey';

export function* rootSaga() {
  yield all([...weatherApiKeySaga]);
}
