import { connect } from 'react-redux';
import { createSelector } from 'reselect';


import Dashboard from './Dashboard';
import * as ApplicationActions from "../../_actions/application";

const getBookmarks = state => state.bookmarks;
const getApplications = state => state.data.applications;
const getApplicationBookmarks = createSelector([getBookmarks], bookmarks => bookmarks.applications);

/**
 * mapStateToProps
 * Provides properties to the component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    applicationBookmarks: getApplicationBookmarks(state),
    applications: getApplications(state),
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
