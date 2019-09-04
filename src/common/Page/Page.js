import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

// SCOPED HEADER STYLES
const styles = theme => ({
  badge: {
    top: 0,
  },
  toolBar: {
    minHeight: 48,
    maxHeight: 48,
    flex: 1,
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
  navLink: {
    color: '#5F625F',
    textDecoration: 'none'
  },
  sizer: {
    flexGrow: 1
  },
  backButton: {
    fontSize: 14,
    height: 36,
    width: 36,
  },
});

const renderBackButton = (backLink, backLabel, classes) => {
  return (backLink && backLabel) ? (
    <Link to={backLink}>
      <Typography headlineMapping={{ body1: 'div' }}>
        <IconButton className={classes.backButton}>
          <i className="fas fa-chevron-left" />
        </IconButton>
        {backLabel}
      </Typography>
    </Link>
  ) : (<span />);
};


// Page component
class Page extends Component {

  render(){
    const { classes, backLabel, backLink, children, toolbar, isRecordExpanded } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="default" className="local-app-bar">
          <Toolbar className={classes.toolBar}>
            {renderBackButton(backLink, backLabel, classes)}
            <div className={classes.sizer}></div>
            <div>{toolbar}</div>
          </Toolbar>
        </AppBar>
        <main className={"main-container" + (isRecordExpanded ? " full-page" : "")}>
          {children}
        </main>
      </Fragment>
    );
  }

}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page);