import 'babel-polyfill';
import { connect } from 'react-redux';

// LOCAL DEPENDENCIES
import App from './App';
import * as Actions from '../_actions';

/**
 * CONTAINER
 * 
 * provides the connection to redux store through 
 * connect(mapStateToProps, mapDispatchToProps)(Applications);
 * 
 * best practice - no component rendering in the container
 */

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSwitchUser: (user) => dispatch(Actions.switchUser(user)),
    handleLogIn: () => dispatch(Actions.logIn()),
    handleLogOut: () => dispatch(Actions.logOut()),
    dismissNotification: id => dispatch(Actions.dismissNotification(id)),
    hideMessage: () => dispatch(Actions.hideMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);