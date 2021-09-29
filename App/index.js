import React from 'react';
import {MainStackScreen} from './config/navigation';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {theme} from 'App/theme';
import Store from './redux/store';

export default function index() {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <MainStackScreen />
      </ThemeProvider>
    </Provider>
  );
}
