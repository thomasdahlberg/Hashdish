import React, { Component } from 'react';
import styles from './SignupFormRest.module.css';

class SignupFormRest extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const {
      values,
      handleChange,
      handleAddressChange,
      handlePlaceChange,
    } = this.props;

    const predictions = values.predictions.map((prediction) => (
      <div className={styles.suggestions} key={prediction.place_id}>
        {prediction.description}
      </div>
    ));

    return (
      <div className={styles.section}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange('email')}
          defaultValue={values.email}
          placeholder={'Email'}
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange('password')}
          defaultValue={values.password}
          placeholder={'Password'}
          type="password"
        />
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          onChange={handleChange('password')}
          defaultValue={values.passwordConfirmation}
          placeholder={'Password Confirmation'}
          type="password"
        />
        <label htmlFor="name">Restaurant Name</label>
        <input
          onChange={handleChange('name')}
          defaultValue={values.name}
          placeholder={'Restaurant Name'}
          type="text"
        />
        <label htmlFor="cuisine">Cuisine</label>
        <input
          onChange={handleChange('cuisine')}
          defaultValue={values.cuisine}
          placeholder={'Cuisine'}
          type="text"
        />
        <label htmlFor="address">Restaurant Address</label>
        <input
          onChange={handleAddressChange('address')}
          defaultValue={values.address}
          placeholder={'Restaurant Address'}
          id="autocomplete"
          type="text"
        />
        <div onClick={handlePlaceChange}>{predictions}</div>
        <button onClick={this.continue}>Continue</button>
      </div>
    );
  }
}

export default SignupFormRest;
