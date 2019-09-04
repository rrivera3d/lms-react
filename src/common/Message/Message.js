import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class Message extends React.Component {

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.hideMessage();
  };

  render() {
    const { classes, showMessage, message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showMessage}
        autoHideDuration={6000}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  showMessage: PropTypes.bool.isRequired,
  hideMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(Message);