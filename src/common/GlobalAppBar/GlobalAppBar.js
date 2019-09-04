import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// LOCAL COMPONENTS
import LoginForm from '../LoginForm';
import NotificationBadge from '../NotificationBadge';

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';

// SCOPED HEADER STYLES
const styles = theme => ({
  avatar: {
    margin: '0 .5rem 0 1rem',
    fontSize: '1.2rem',
    width: 36,
    height: 36,
    background: theme.palette.grey['800']
  },
  toolBar: {
    minHeight: 48,
    maxHeight: 48
  },
  menuButton: {
    marginLeft: '-1rem',
    fontSize: '1rem',
    height: '2rem',
    width: '2rem'
  },
  header: {
    flex: 1,
    maxHeight: 32,
    overflow: 'hidden',
    position: 'relative'
  },
  logo: {
    position: 'relative',
    height: 24,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%'
  },
  navLink: {
    color: '#5F625F',
    textDecoration: 'none'
  }
});

/**
 * GlobalAppBar Component
 */
class GlobalAppBar extends Component {

  state = {
    anchorEl: null,
    showPassword: false,
    navMenuOpen: false,
  };

  handleNavMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget, navMenuOpen: true });
  }; 

  handleNavMenuClose = () => {
    this.setState({ anchorEl: null, navMenuOpen: false });
  };

  handleSwitchUser = event => {
    this.props.handleSwitchUser(event.currentTarget.id);
    this.handleNavMenuClose();
  };

  handleLogOut = event => {
    this.props.handleLogOut();
    this.handleNavMenuClose();
  };

  render() {

    const { session, classes, navMenuItems, theme, notification, dismissNotification } = this.props;
    const { logo } = theme;
    const { anchorEl, navMenuOpen } = this.state;

    const { firstName, lastName } = session;
    const fullName = [firstName, lastName].join(" ");

    return (
      <AppBar position="static" className="global-app-bar">
        <Toolbar className={classes.toolBar + " toolbar"}>

          <IconButton 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="Menu"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleNavMenuClick}
          >
            <i className="fas fa-bars" />
          </IconButton>
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={navMenuOpen}
            onClose={this.handleNavMenuClose}
          >
            {
              navMenuItems
                .map(navMenuItem => {
                  return (      
                    <MenuItem 
                      key={navMenuItem.id}
                      id={navMenuItem.id} 
                      onClick={this.handleNavMenuClose}
                    >
                      <Link to={navMenuItem.link} className={classes.navLink}>
                        {navMenuItem.label}
                      </Link>
                    </MenuItem>
                  );
                })
            }

            <MenuItem 
              key='telus'
              id='telus'
              onClick={this.handleSwitchUser}
              className={classes.navLink}
            >
              Login as a Telus Guy
            </MenuItem>

            <MenuItem 
              key='rogers'
              id='rogers'
              onClick={this.handleSwitchUser}
              className={classes.navLink}
            >
              Login as a Rogers CSR
            </MenuItem>

            <MenuItem 
              key='progressa'
              id='progressa'
              onClick={this.handleSwitchUser}
              className={classes.navLink}
            >
              Login as Ryan Rivera
            </MenuItem>

            <MenuItem
              key='logout'
              id='logout'
              onClick={this.handleLogOut}
              className={classes.navLink}
            >
              Log Out
            </MenuItem>

          </Menu>

          <Typography variant="title" color="inherit" className={classes.header}>
            <div style={logo} className={classes.logo} alt="logo" />
          </Typography>

          <NotificationBadge
            notification={notification}
            dismissNotification={dismissNotification}
          />

          <Avatar 
            aria-label={fullName} 
            className={classes.avatar}>
            {fullName.split('')[0].toUpperCase()}
          </Avatar>
          <Typography color="inherit">{fullName}</Typography>
        </Toolbar>
        <LoginForm handleLogIn={this.props.handleLogIn}  />
      </AppBar>
    );

  }
}

GlobalAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  navMenuItems: PropTypes.array.isRequired,
};

export default withStyles(styles)(GlobalAppBar);