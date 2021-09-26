import React from 'react';
import {MainStackScreen} from './config/navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducers';
import {ThemeProvider} from 'styled-components/native';
import {theme} from 'App/theme';

export default function index() {
  return (
    <Provider store={createStore(reducers)}>
      <ThemeProvider theme={theme}>
        <MainStackScreen />
      </ThemeProvider>
    </Provider>
  );
}
