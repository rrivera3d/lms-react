import reducer from './notifications';
import { addNotification, dismissNotification } from '../_actions/';

const initialState = {
  messages: []
};

let payload;

describe('notifications reducer', () => {

  beforeEach(() => {
    payload = {
      action: "APPLICATION_APPROVED",
      created: "2018-03-14T20:08:00.081Z",
      id: "0",
      message: "Application for Arlen Masseo was approved on Mar 14, 2018 01:08 pm!"
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_NOTIFICATION', () => {
    const action = addNotification(payload);
    expect(reducer(initialState, action)).toEqual({messages: [payload]});
  });

  it('should handle DISMISS_NOTIFICATION', () => {
    const id = "0";
    const action = dismissNotification(id);
    expect(reducer({messages: [payload]}, action)).toEqual({messages: []});
  });

});