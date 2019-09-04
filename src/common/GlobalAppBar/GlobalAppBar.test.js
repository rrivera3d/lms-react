import React from 'react';
import GlobalAppBar from './GlobalAppBar';

import { createShallow } from 'material-ui/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

describe('Unit Test > Component > <GlobalAppBar/>', () => {

  let shallow;

  beforeEach(() => {
    shallow = createShallow({dive: true});
  });

  it('should render <GlobalAppBar /> component', () => {
    const wrapper = shallow(<GlobalAppBar {...props} />);
    expect(wrapper.length).toBe(1);
  });

});
