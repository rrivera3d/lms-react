/**
 * CONTAINER
 *
 * provides the connection to state container through
 * connect(mapStateToProps, mapDispatchToProps)(Applications);
 *
 * best practice - no component rendering in the container
 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// LOCAL DEPENDENCIES
import Applications from './Applications';
import * as ApplicationActions from '../../_actions/application';

/**
 * getApplications
 * @param state
 * @returns {*|Function|{results: *[], totalRecordCount: number}|data.applications|{results, totalRecordCount}}
 */
const getApplications = state => state.data.applications;

const getApplicationsWithActions = createSelector([getApplications], apps => {
  let results = apps.results ? apps.results.map(app => {
    app.actions = { id: app.id, status: app.status };
    return app;
  }) : [];
  return Object.assign({...apps}, {results});
});

/**
 * mapStateToProps
 * Provides properties to the component
 * @param {*} state 
 */
const mapStateToProps = state => {
  return {
    applications: getApplicationsWithActions(state)
  };
};

/**
 * mapDispatchToProps
 * Provides methods to the component
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return { 
    requestApplications: () => dispatch(ApplicationActions.requestApplications()),
    approveApplication: (id) => dispatch(ApplicationActions.approveApplication(id)),
    declineApplication: (id) => dispatch(ApplicationActions.declineApplication(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
