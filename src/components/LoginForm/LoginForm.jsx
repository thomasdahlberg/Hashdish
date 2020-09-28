import React, { Component } from 'react';
import styles from './LoginForm.module.css';
import axios from 'axios';
import LocalStorageService from '../../utils/localStorageService';

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log('Axios Interceptors');
    const token = localStorageService.getAuthToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

class LoginForm extends Component {
  
  state = this.getInitialState();
  
  getInitialState() {
    return {
      email: '',
      password: '',
      error: '',
    };
  }

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
    const { email, password } = this.state;
    await axios
      .post(
        `https://dev.hashdish.com/v1.0/kitchen/authorize?email=${email}&password=${password}`,
        {}
      )
      .then(function (response) {
        if (response.status === 200) {
          LocalStorageService.setToken(response.data);
        }
        alert('Successfully logged in');
      })
      .catch(function (error) {
        console.log(error);
        alert('Failed to login');
      });
    this.props.handleSignupOrLogin();
    LocalStorageService.getAuthToken() ? this.props.history.push('/') : this.props.history.push('/login');
  };

  render() {
    return (
      <section className={styles.section}>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button disabled={!this.isFormValid()} type="submit">
            Login
          </button>
        </form>
      </section>
    );
  }
}

export default LoginForm;
