import React, { Component } from 'react';
import styles from './SignupFormConfirmation.module.css';

class SignupFormConfirmation extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleSubmit } = this.props;

    return (
      <section className={styles.section}>
        {values.error && <p>{values.error}</p>}
        <ul>
          <label>Email</label>
          <li>{values.email}</li>
          <label>Restaurant Name</label>
          <li>{values.name}</li>
          <label>Cuisine</label>
          <li>{values.cuisine}</li>
          <label>Restaurant Address</label>
          <li>{values.address}</li>
          <label>Minimum Preparing Minutes</label>
          <li>{values.minimumPreparingMinutes}</li>
          <label>Open Hours</label>
          <li>{values.openHours}</li>
          <label>Time Zone</label>
          <li>{values.timezone}</li>
        </ul>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={this.back}>Back</button>
      </section>
    );
  }
}

export default SignupFormConfirmation;
