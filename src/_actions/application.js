// APPLICATION ACTIONS

import {

  GET_APPLICATIONS,
  SHOW_APPLICATIONS,
  SHOW_APPLICATIONS_FAILED,

  GET_APPLICATION,
  SHOW_APPLICATION,
  SHOW_APPLICATION_FAILED,

  APPROVE_APPLICATION,
  APPROVE_APPLICATION_FAILED,

  DECLINE_APPLICATION,
  DECLINE_APPLICATION_FAILED,

  POST_DECLINE_APPLICATION,
  POST_APPROVE_APPLICATION,

  BOOKMARK_APPLICATION,

} from '../_constants/application';

export function requestApplications () {
  return {
    type: GET_APPLICATIONS
  }
}

export function showApplications(payload) {
  return {
    type: SHOW_APPLICATIONS,
    payload
  }
}

export function showApplicationsFailed(error) {
  return {
    type: SHOW_APPLICATIONS_FAILED,
    error
  }
}

export function requestApplication (data) {
  return {
    type: GET_APPLICATION,
    id: data.id
  }
}

export function showApplication(payload) {
  return {
    type: SHOW_APPLICATION,
    payload
  }
}

export function showApplicationFailed(error) {
  return {
    type: SHOW_APPLICATION_FAILED,
    error
  }
}

export function approveApplication(id) {
  return {
    type: POST_APPROVE_APPLICATION,
    id
  }
}

export function showApprovedApplication(payload) {
  return {
    type: APPROVE_APPLICATION,
    payload
  }
}

export function showApprovedApplicationFailed(error) {
  return {
    type: APPROVE_APPLICATION_FAILED,
    error
  }
}

export function declineApplication(id) {
  return {
    type: POST_DECLINE_APPLICATION,
    id
  }
}


export function showDeclinedApplication(payload) {
  return {
    type: DECLINE_APPLICATION,
    payload
  }
}

export function showDeclinedApplicationFailed(error) {
  return {
    type: DECLINE_APPLICATION_FAILED,
    error
  }
}

export function bookmarkApplication(url) {
  return {
    type: BOOKMARK_APPLICATION,
    url
  }
}