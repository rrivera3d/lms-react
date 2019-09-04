import React from 'react';
import Application from './Application';

import { createShallow } from 'material-ui/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let ApplicationComponent;
const props = {
  application: {
    clients: [],
    notes: ['0', '1'],
    emails: [],
    documents: [],
  },
  match: {
    params: {id: '0'}
  },
  requestApplication: jest.fn()
};

describe('Unit Test > Component > <Application />', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow({dive: true});
    ApplicationComponent = shallow(<Application {...props} />);
  });

  // Test for component rendering
  it('should render <Application /> component', () => {
    expect(ApplicationComponent.length).toBe(1);
  });

  // Tests for component methods
  it('.isTabValid() should return true if arg is "loan"', () => {
    const result = ApplicationComponent.instance().isTabValid('loan');
    expect(result).toBe(true);
  });

  it('.isTabValid() should return true if arg is "notes" due to total notes being 2', () => {
    const result = ApplicationComponent.instance().isTabValid('notes');
    expect(result).toBe(true);
  });

  it('.isTabValid() should return false if arg is "emails" due to total emails being 0', () => {
    const result = ApplicationComponent.instance().isTabValid('emails');
    expect(result).toBe(false);
  });

  // Test correct state from calling a method
  it('.handleChange() should change state.currentTab to "1"', () => {
    ApplicationComponent.instance().handleChange({}, 1);
    const currentTab = ApplicationComponent.instance().state.currentTab;
    expect(currentTab).toEqual(1);
  });

});