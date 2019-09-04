import configureStore from 'redux-mock-store';
import initSocket from './WebSocket';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Unit Test > Service > WebSocket', () => {

  it('should be defined.', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const messageHandler = () => {};
    const url = 'ws://localhost:5000';
    const socket = initSocket(store, messageHandler, url);
    expect(socket).toBeDefined();
  });

});