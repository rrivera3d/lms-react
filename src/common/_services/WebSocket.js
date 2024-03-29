import WebSocket from 'isomorphic-ws';

/**
 * initSocket
 * @param options
 * @returns {WebSocket}
 */
const initSocket = (store, messageHandler, url) => {

  const { dispatch } = store;
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('initSocket: connection opened...');
  };

  socket.onmessage = (event) => {
    messageHandler(dispatch, event);
  };

  return socket;
};

export default initSocket;