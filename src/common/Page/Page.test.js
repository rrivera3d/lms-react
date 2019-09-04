import React from 'react';
import Page from './Page';

import { createShallow } from 'material-ui/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Unit Test > Component > <Page />', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow({dive: true});
  });

  it('should render <Page /> component', () => {
    const wrapper = shallow(<Page />);
    expect(wrapper.length).toBe(1);
  });

  it('should render <main class="main-container" />', () => {
    const wrapper = shallow(<Page />);
    expect(wrapper.find('.main-container').length).toBe(1);
  });

  it('should render <AppBar class="local-app-bar" />', () => {
    const wrapper = shallow(<Page />);
    expect(wrapper.find('.local-app-bar').length).toBe(1);
  });
});