import {
  BOOKMARK_APPLICATION
} from '../_constants/application'

// bookmarks
const initialState = {
  applications: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {

    case BOOKMARK_APPLICATION:
      const maxCount = 50;
      let applications = state.applications.concat([action.url]);
      if (applications.length > maxCount) {
        applications = applications.slice(applications.length - maxCount, applications.length);
      }
      return Object.assign({...state}, {applications});

    default:
      return state;
  }
};