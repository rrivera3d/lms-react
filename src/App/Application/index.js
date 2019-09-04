/**
 * CONTAINER
 *
 * provides the connection to state container through
 * connect(mapStateToProps, mapDispatchToProps)(Applications);
 *
 * best practice - no component rendering in the container
 */
import { connect } from 'react-redux';

import Application from './Application';
import * as ApplicationActions from '../../_actions/application';

/**
 * getApplication
 * @param state
 * @returns {*|Function}
 */
const getApplication = state => state.data.application;
const getSession = state => state.session;

/**
 * mapStateToProps
 * @param state
 * @returns {{application: *|Function}}
 */
const mapStateToProps = state => {
  return {
    application: getApplication(state),
    session: getSession(state),
  }
};

/**
 * mapDispatchToProps
 * @param dispatch
 * @returns {{requestApplication: function(*=): *}}
 */
const mapDispatchToProps = dispatch => ({
  requestApplication: data => dispatch(ApplicationActions.requestApplication(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
