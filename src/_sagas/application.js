import { put, takeLatest, all, call } from 'redux-saga/effects';

// LOCAL DEPENDENCIES
import restService from '../common/_services/RestService';
import { API_APPLICATIONS } from '../_constants/api';
import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  POST_APPROVE_APPLICATION,
  POST_DECLINE_APPLICATION
} from '../_constants/application';
import * as Actions from '../_actions/application';
import moment from 'moment';


// APPLICATIONS GET
function* requestApplications() {
  try {
    const payload = yield call(
      restService.get,
      restService.getEndPoint(API_APPLICATIONS)
    );

    yield put(
      Actions.showApplications(payload)
    );

  } catch (error) {
    yield put(
      Actions.showApplicationsFailed(error)
    );
  }
}

// APPLICATION GET
function* requestApplication(data) {
  try {
    const payload = yield call(
      restService.get,
      restService.getEndPoint(API_APPLICATIONS, data)
    );
    yield all([
      put(Actions.showApplication(payload)),
      put(Actions.bookmarkApplication({
        id: moment().unix(),
        appId: payload.id,
        created: moment().toISOString(),
        path: `/applications/${payload.id}`,
        primaryApplicant: `${payload.firstName} ${payload.lastName}`
      }))
    ]);
  } catch (error) {
    yield put(
      Actions.showApplicationFailed(error)
    );
  }
}

// APPLICATION POST
function* approveApplication(data) {
  try {
    const payload = yield call(
      restService.post,
      restService.getEndPoint(API_APPLICATIONS, data, 'approve')
    );
    yield put(
      Actions.showApprovedApplication(payload)
    );

  } catch (error) {
    yield put(
      Actions.showApprovedApplicationFailed(error.message)
    );
  }
}

function* declineApplication(data) {
  try {
    const payload = yield call(
      restService.post,
      restService.getEndPoint(API_APPLICATIONS, data, 'decline')
    );
    yield put(
      Actions.showDeclinedApplication(payload)
    );
  } catch (error) {
    yield put(
      Actions.showDeclinedApplicationFailed(error)
    );
  }
}


// WATCHERS

function* watchApplicationsRequestAsync() {
  yield takeLatest(GET_APPLICATIONS, requestApplications);
}

function* watchApplicationRequestAsync() {
  yield takeLatest(GET_APPLICATION, requestApplication);
}

function* watchApplicationApproveRequestAsync() {
  yield takeLatest(POST_APPROVE_APPLICATION, approveApplication);
}

function* watchApplicationDeclineRequestAsync() {
  yield takeLatest(POST_DECLINE_APPLICATION, declineApplication);
}


// MAIN EXPORT

/**
 * APPLICATION SAGA
 * Watches async requests,
 * in case of request, uses appropriate Action
 * passed in the reducer to return a new state
 */
export default function* ApplicationSaga() {
  yield all([
    watchApplicationsRequestAsync(),
    watchApplicationRequestAsync(),
    watchApplicationApproveRequestAsync(),
    watchApplicationDeclineRequestAsync()
  ]);
}