import {
  SHOW_APPLICATION,
  SHOW_APPLICATION_FAILED
} from '../_constants/application'

// data.applications
const initialState = {};

export default (state = initialState, action = {}) => {
  switch(action.type) {

    case SHOW_APPLICATION:
      return Object.assign({...state}, action.payload);

    case SHOW_APPLICATION_FAILED:
      return state;

    default:
      return state;
  }
};