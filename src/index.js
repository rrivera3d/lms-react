import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux';

import config from './config';
import bootstrap from './common/_services/Bootstrapper';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './_sagas/index';
import reducers from './_reducers/index';
import messageHandler from './_websockets/index';
import App from './App';

/**
 * TODO: Ryan R
 * - Prettier https://prettier.io
 * - React Storybook
 * - React Idle
 * - React Transition Group
 * 
 */

// Bootstrap Application
// Configure Store (State)
const { persistor, store } = bootstrap({

  persistenceConfig: {

    // Only the state management store object defined
    // will be persisted to localStorage
    whitelist: config.persistWhitelist,

    // Append to the localStorage key.
    // This will enable unique user session persistence
    key: config.persistKey + '_default',
  },

  websocketConfig: {
    url: config.wsUrl,
    messageHandler
  },

  sagaConfig: {
    rootSaga
  },

  reducerConfig: {
    reducers
  }

});

ReactDOM.render((
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
), document.getElementById(config.rootDOM));

registerServiceWorker();