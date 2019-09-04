import _ from 'lodash';

import {
  SHOW_APPLICATIONS,
  SHOW_APPLICATIONS_FAILED,

  APPROVE_APPLICATION,
  DECLINE_APPLICATION
} from '../_constants/application'

// data.applications
const initialState = {
  results: []
};

const updateApplication = (state, action) => {
  const i = _.findIndex(state.results, {id: action.payload.id});
  const newState = {...state};
  newState.results[i] = action.payload;
  return newState;
};

export default (state = initialState, action = {}) => {

  switch(action.type) {

    case SHOW_APPLICATIONS:
      return Object.assign(...state, { 
        results: action.payload.results
      });

    case APPROVE_APPLICATION:
      return updateApplication(state, action);

    case DECLINE_APPLICATION:
      return updateApplication(state, action);

    default:
      return state;
  }
};