import { ADD_NOTIFICATION } from '../_constants';
import * as Actions from '../_actions';

export default (dispatch, event) => {

  const data = JSON.parse(event.data);
  const events = data.events || [];

  for (let i=0, I=events.length; i<I; i++) {

    let evt = events[i];
    let type = evt.type;
    let payload = evt.payload;

    switch (type) {

      case ADD_NOTIFICATION:
        dispatch(Actions.addNotification(payload));
        break;

      default:
        break;
    }
  }
};