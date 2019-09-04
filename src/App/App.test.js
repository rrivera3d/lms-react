import React from 'react';

import { createShallow } from 'material-ui/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

import applyTheme from '../common/_services/ThemeProvider';

configure({ adapter: new Adapter() });

const ThemedApp = applyTheme(App);

const props = {
  session: {
    userName: 'local',
    firstName: '',
    lastName: '',
    company: 'progressa',
    type: 'CSR',
    lang: 'en',
    preferences: {},
    isAuthenticated: false,
    permissions: {},
  },
  notification: { messages: [] },
  theme: {},
  navMenuItems: []
};

describe('Unit Test > Component > <App/>', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('should render <App /> component', () => {
    const wrapper = shallow(<ThemedApp {...props} />);
    expect(wrapper.find(App).length).toBe(1);
  });

});

