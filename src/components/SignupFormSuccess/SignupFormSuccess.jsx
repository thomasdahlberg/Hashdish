import React, { Component } from 'react';
import styles from './SignupFormSuccess.module.css';
import { Link } from 'react-router-dom';

class SignupFormSuccess extends Component {
  render() {
    return (
      <section className={styles.section}>
        <h1>Success</h1>

        <Link to="/">
          <button>Go Home</button>
        </Link>
      </section>
    );
  }
}

export default SignupFormSuccess;
