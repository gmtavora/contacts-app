import React from 'react';
import { Provider } from 'react-redux';

import Routes from './src/routes';
import store from './redux/configureStore';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}