import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../redux/reducers';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleWareToApply = [sagaMiddleware];
const middleWare = applyMiddleware(...middleWareToApply);
const Store = createStore(reducers, middleWare);

sagaMiddleware.run(rootSaga);
export default Store;
