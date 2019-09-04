import {combineReducers} from "redux";

// LOCAL DEPENDENCIES
import session from './session';
import notification from './notifications';
import uiControls from './uiControls';
import applications from './applications';
import application from './application';
import bookmarks from './bookmarks';

const data = combineReducers({
  applications,
  application,
});

export default { bookmarks, data, notification, session, uiControls };
