import React from 'react';
import {MainStackScreen} from './config/navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducers';

export default function index() {
  return (
    <Provider store={createStore(reducers)}>
      <MainStackScreen />
    </Provider>
  );
}
