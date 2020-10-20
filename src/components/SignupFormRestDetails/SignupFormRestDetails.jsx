import React, { Component } from 'react';
import styles from './SignupFormRestDetails.module.css';

class SignupFormRestDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <div className={styles.section}>
        <label htmlFor="minimumPreparingMinutes">
          Minimum Preparaing Minutes
        </label>
        <input
          onChange={handleChange('minimumPreparingMinutes')}
          defaultValue={values.minimumPreparingMinutes}
          placeholder={'Minimum Preparing Minutes'}
          type="number"
        />
        <label htmlFor="timezone">Timezone</label>
        <input
          onChange={handleChange('timezone')}
          defaultValue={values.timezone}
          placeholder={'Time Zone'}
          type="text"
        />
        <label htmlFor="openHours">Open Hours</label>
        <input
          onChange={handleChange('openHours')}
          defaultValue={values.openHours}
          placeholder={'Open Hours'}
        />
        <button onClick={this.continue}>Continue</button>
        <button onClick={this.back}>Back</button>
      </div>
    );
  }
}

export default SignupFormRestDetails;
