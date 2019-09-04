import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import applyTheme from '../common/_services/ThemeProvider';
import config from '../config';

// PAGE COMPONENTS
import Dashboard from './Dashboard';
import Applications from './Applications';
import Application from './Application';

// COMMON COMPONENTS
import Message from '../common/Message';
import GlobalAppBar from '../common/GlobalAppBar';

/**
 * APP
 * 
 * Main Routes are defined... 
 * though sub routes can be defined in the components as needed 
 * 
 * Material-UI Theme is applied to the entire app
 */

const App = (props) => {

  const { session, uiControls, hideMessage } = props;
  const { message, showMessage } = uiControls;
  const company = session.company || process.env.REACT_APP_COMPANY;
  const customTheme = config.theme[company];

  const navMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      link: '/' 
    },
    { 
      id: 'applications', 
      label: 'Applications', 
      link: '/applications' 
    }
  ];

  return (
    <Router>
      <div className={session.isAuthenticated ? "app logged-in" : "app logged-out"}>
        <GlobalAppBar 
          theme={customTheme}
          navMenuItems={navMenuItems}
          session={props.session}
          handleSwitchUser={props.handleSwitchUser}
          handleLogIn={props.handleLogIn}
          handleLogOut={props.handleLogOut}
          notification={props.notification}
          dismissNotification={props.dismissNotification}
        />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path='/applications/:id' render={
            (props) => {

              /**
               * Any feature detection logic can go here,
               * as we have access to the state tree
               */
              return (
                <Application {...props} />
              )
            }
          } />
          <Route path='/applications' render={
            (props) => {
              return (
                <Applications {...props} />
              )
            }
          } />
        </Switch>
        <Message
          showMessage={showMessage}
          message={message}
          hideMessage={hideMessage}
        />
      </div>
    </Router>
  )
};

export default applyTheme(App);