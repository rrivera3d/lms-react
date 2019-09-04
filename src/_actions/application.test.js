import * as Actions from './application'
import {
  APPROVE_APPLICATION,
  BOOKMARK_APPLICATION,
  GET_APPLICATION,
  GET_APPLICATIONS,
  POST_APPROVE_APPLICATION,
  SHOW_APPLICATION,
} from '../_constants/application'

describe('Unit Test > Actions > Application', () => {

  it('should create an action to POST_APPROVE_APPLICATION', () => {
    const id = '0';
    const expectedAction = {
      type: POST_APPROVE_APPLICATION,
      id
    };
    expect(Actions.approveApplication(id)).toEqual(expectedAction);
  });

  it('should create an action to SHOW_APPLICATION', () => {
    const payload = [];
    const expectedAction = {
      type: SHOW_APPLICATION,
      payload
    };
    expect(Actions.showApplication(payload)).toEqual(expectedAction);
  });

  it('should create an action to APPROVE_APPLICATION', () => {
    const payload = [];
    const expectedAction = {
      type: APPROVE_APPLICATION,
      payload
    };
    expect(Actions.showApprovedApplication(payload)).toEqual(expectedAction);
  });

  it('should create an action to BOOKMARK_APPLICATION', () => {
    const url = '/applications/0';
    const expectedAction = {
      type: BOOKMARK_APPLICATION,
      url
    };
    expect(Actions.bookmarkApplication(url)).toEqual(expectedAction);
  });

  it('should create an action to GET_APPLICATIONS', () => {
    const expectedAction = {
      type: GET_APPLICATIONS,
    };
    expect(Actions.requestApplications()).toEqual(expectedAction);
  });

  it('should create an action to GET_APPLICATION', () => {
    const data = {id: '0'};
    const expectedAction = {
      type: GET_APPLICATION,
      id: data.id
    };
    expect(Actions.requestApplication(data)).toEqual(expectedAction);
  });

});