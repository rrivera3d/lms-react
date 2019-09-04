import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';

import initSocket from './WebSocket';

export default (options) => {

  const { persistenceConfig, websocketConfig, sagaConfig, reducerConfig } = options;

  // Store Arguments
  const persistConfig = Object.assign({...persistenceConfig, storage});

  // Combine All Reducers
  const reducer = persistCombineReducers(persistConfig, reducerConfig.reducers);

  // Initial Store State
  const initialState = {};

  // Config DevTools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Store enhancers (Middleware)
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = applyMiddleware(createLogger(), sagaMiddleware);

  // Create store and persist to localStorage
  const store = createStore(reducer, initialState, composeEnhancers(enhancers));

  // Persist Store to LocalStorage
  const persistor = persistStore(store);

  // Initialize WebSockets
  const { messageHandler, url } =  websocketConfig;
  const socket = initSocket(store, messageHandler, url);

  // Run Saga Middleware
  sagaMiddleware.run(sagaConfig.rootSaga, socket);

  return { persistor, store };
};