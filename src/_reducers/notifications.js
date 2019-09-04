import _ from 'lodash';

import { ADD_NOTIFICATION, DISMISS_NOTIFICATION } from '../_constants';

const initialState = {
  messages: []
};

export default (state = initialState, action = {}) => {

  let newState;

  switch(action.type) {

    case ADD_NOTIFICATION:
      newState = {...state};
      newState.messages = newState.messages.concat([action.payload]);
      return newState;

    case DISMISS_NOTIFICATION:
      newState = {...state};
      const index = _.findIndex(newState.messages, {id: action.id});
      newState.messages.splice(index, 1);
      return newState;

    default:
      return state;
  }
};
