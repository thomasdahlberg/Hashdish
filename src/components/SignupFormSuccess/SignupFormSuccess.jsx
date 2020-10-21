import React, { Component } from 'react';
import styles from './SignupFormSuccess.module.css';
import { Link } from 'react-router-dom';

class SignupFormSuccess extends Component {
  render() {
    return (
      <section className={styles.section}>
        <h1>Sign Up Complete!</h1>
        <p>Click the button below to log in.</p>
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </section>
    );
  }
}

export default SignupFormSuccess;
