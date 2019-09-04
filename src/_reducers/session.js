import { SWITCH_USER, LOG_IN, LOG_OUT } from '../_constants';

const initialState = {
  userName: 'local',
  firstName: 'Ryan',
  lastName: 'Rivera',
  company: 'progressa',
  type: 'CSR',
  lang: 'en',
  preferences: {},
  isAuthenticated: false,
  permissions: {},
};

export default (state = initialState, action = {}) => {

  let sessionObj = {};
  switch(action.type) {

    case SWITCH_USER:

      sessionObj = { company: action.user };

      if (action.user === 'progressa') {
        sessionObj.firstName = 'Ryan';
        sessionObj.lastName = 'Rivera';
      }

      if (action.user === 'telus') {
        sessionObj.firstName = 'Telus';
        sessionObj.lastName = 'Guy';
      }

      if (action.user === 'rogers') {
        sessionObj.firstName = 'Rogers';
        sessionObj.lastName = 'CSR';
      }

      return Object.assign({...state}, sessionObj);

    case LOG_IN:
      sessionObj = {isAuthenticated: true};
      return Object.assign({...state}, sessionObj);

    case LOG_OUT:
      sessionObj = {isAuthenticated: false};
      return Object.assign({...state}, sessionObj);

    default:
      return state;
  }
};
