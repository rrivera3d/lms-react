import {APPROVE_APPLICATION_FAILED} from "../_constants/application";
import {HIDE_MESSAGE} from "../_constants";

import {
  ERROR,
  SUCCESS,
  WARNING,
} from "../_constants/severity";

const initialState = {
  isLoading: false,
  showMessage: false,
  message: null,
  severity: null,
};

export default (state = initialState, action = {}) => {
  switch(action.type) {

    case APPROVE_APPLICATION_FAILED:
      return Object.assign({...state}, {
        showMessage: true,
        message: action.error,
        severity: ERROR,
      });

    case HIDE_MESSAGE:
      return Object.assign({...state}, {
        showMessage: false,
      });

    default:
      return state;
  }
};
