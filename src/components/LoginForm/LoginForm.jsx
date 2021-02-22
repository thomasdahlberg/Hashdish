import React, { Component } from 'react';
import { axiosApiInstance as API } from '../../utils/axiosConfig';
import LocalStorageService from '../../utils/localStorageService';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@material-ui/core';

class LoginForm extends Component {
  state = {
      email: '',
      password: '',
      isLoading: false,
      setOpen: true
  };

  isFormValid = () => {
    return this.state.email && this.state.password;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true })
    const { email, password } = this.state;
    await API.post(
      `/kitchen/authorize?email=${email}&password=${password}`,
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          LocalStorageService.setToken(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to login');
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
    this.props.handleSignupOrLogin();
    LocalStorageService.getAuthToken()
      ? this.props.history.push('/')
      : this.props.history.push('/login');
  };

  handleClose = () => {
    this.setState({ setOpen: false })
  }

  render() {
    return (
      <div>
      <Dialog open={this.state.setOpen} onClose={this.handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <form onSubmit={this.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            label="Email Address"
            id="email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            margin="dense"
            fullWidth
            label="Password"
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={!this.isFormValid()}>
            Login
          </Button>
          {this.state.isLoading ? <CircularProgress /> : null}
        </DialogActions>
        </form>
      </Dialog>
      </div>
    );
  }
}

export default LoginForm;
