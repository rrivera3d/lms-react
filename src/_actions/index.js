// GLOBAL ACTIONS

import {
  ADD_NOTIFICATION,
  DISMISS_NOTIFICATION,
  LOG_IN,
  LOG_OUT,
  SWITCH_USER,
  HIDE_MESSAGE
} from '../_constants';

export function switchUser (user) {
  return {
    type: SWITCH_USER,
    user
  }
}

export function logIn () {
  return {
    type: LOG_IN
  }
}

export function logOut () {
  return {
    type: LOG_OUT
  }
}

export function addNotification (payload) {
  return {
    type: ADD_NOTIFICATION,
    payload
  }
}

export function dismissNotification (id) {
  return {
    type: DISMISS_NOTIFICATION,
    id
  }
}

export function hideMessage () {
  return {
    type: HIDE_MESSAGE
  }
}