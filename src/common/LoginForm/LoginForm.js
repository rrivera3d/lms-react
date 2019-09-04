import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MATERIAL-UI
import {withStyles} from "material-ui/styles/index";
import Typography from 'material-ui/Typography';

import { FormControl } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

// MATERIAL-UI ICONS
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

// SCOPED HEADER STYLES
const styles = theme => ({
  formControl: {
    margin: "8px 0",
  },
  loginForm: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    width: 360,
    backgroundColor: theme.palette.common['white'],
    padding: 40,
    zIndex: 1
  },
  button: {
    margin: "48px 0",
  },
});

/**
 * LoginForm Component
 */
class LoginForm extends Component {

  state = {
    showPassword: false
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleLogIn = () => {
    this.props.handleLogIn();
  };

  render() {

    const { classes } = this.props;

    return (
      <form className={classes.loginForm + " login-form"}>
        <Typography variant="headline" color="primary">
          Login
        </Typography>
        <FormControl className={classes.formControl}>
          <TextField
            id="username"
            label="Username"
            value={this.state.name}
            margin="normal"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password" className={classes.textFieldLabel}>Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPasssword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="raised" color="primary" className={classes.button} onClick={() => this.handleLogIn()}>
          Login
        </Button>
      </form>
    );

  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);