import React, { Component, Fragment } from 'react';
import moment from "moment/moment";

import PropTypes from "prop-types";
import {findDOMNode} from "react-dom";
import { Link } from 'react-router-dom';

// MATERIAL-UI
import {withStyles} from "material-ui/styles";
import Badge from 'material-ui/Badge';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

// SCOPED HEADER STYLES
const styles = theme => ({
  badge: {
    top: 0,
  },
  badgeButton: {
    fontSize: '1rem',
    height: '2rem',
    width: '2rem'
  },
});

const NotificationTable = (props) => {

  const { classes, notification, dismissNotification } = props;
  const notifications = notification.messages;

  const handleNotificationDismiss = event => {
    let target = event.currentTarget;
    let id = target.id;
    dismissNotification(id);

    if (notifications.length === 0) {
      props.handleNotificationClose();
    }
  };

  const notificationRow = (n, i) => {
    return (
      <TableRow key={i}>
        <TableCell><Link to={`/applications/${n.id}`}>{n.message}</Link></TableCell>
        <TableCell>{moment(n.created).fromNow()}</TableCell>
        <TableCell>
          <IconButton id={n.id} onClick={handleNotificationDismiss}>
            <i className="far fa-times-circle"></i>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Messages</TableCell>
          <TableCell>Time</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {notifications.map(notificationRow.bind(this))}
      </TableBody>
    </Table>
  );
};

class NotificationBadge extends Component {

  state = {
    anchorEl: null,
    notificationOpen: false,
    anchorReference: 'anchorEl',
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
  };

  button = null;

  handleNotificationClick = (notificationsLength) => {
    this.setState({
      notificationOpen: notificationsLength > 0,
      anchorEl: findDOMNode(this.button),
    });
  };

  handleNotificationClose = () => {
    this.setState({
      notificationOpen: false,
    });
  };

  render() {

    const {
      anchorEl,
      notificationOpen,
      anchorReference,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
    } = this.state;

    const { classes, notification } = this.props;
    const notifications = notification.messages;

    return (
      <Fragment>

        <IconButton
          className={classes.badgeButton}
          color="inherit"
          aria-label="Menu"
          ref={node => {
            this.button = node;
          }}
          onClick={() => { this.handleNotificationClick(notifications.length) }}
        >
          <Badge badgeContent={notifications.length > 0 ? notifications.length : ''} color={notifications.length > 0 ? "error" : "default"}>
            <i className="fas fa-bell"></i>
          </Badge>
        </IconButton>

        <Popover
          open={notificationOpen}
          anchorEl={anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleNotificationClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
              horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
           <NotificationTable handleNotificationClose={this.handleNotificationClose} {...this.props} />

        </Popover>

        <Typography color="inherit">Notifications</Typography>

      </Fragment>
    );
  }
}

NotificationBadge.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  dismissNotification: PropTypes.func.isRequired,
};

export default withStyles(styles)(NotificationBadge);