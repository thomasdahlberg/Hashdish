import React, { Component } from 'react';
import styles from './SignupFormConfirmation.module.css';

function profileTime(timeArr) {
  let timeStringArr = [];
  for (var time of timeArr) {
    var start = [
      String(
        Math.floor(time[0] / 100) % 12 === 0
          ? 12
          : Math.floor(time[0] / 100) % 12
      ),
      ':',
      ('0' + String(time[0] % 100)).slice(-2),
      time[0] / 100 >= 12 ? ' PM' : ' AM',
    ].join('');
    var end = [
      String(
        Math.floor(time[1] / 100) % 12 === 0
          ? 12
          : Math.floor(time[1] / 100) % 12
      ),
      ':',
      ('0' + String(time[1] % 100)).slice(-2),
      time[1] / 100 >= 12 ? ' PM' : ' AM',
    ].join('');
    timeStringArr.push(`${start} ~ ${end}`);
  }
  return timeStringArr.join(', ');
}

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
    const DAYS = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const openHours = JSON.parse(values.openHours);
    return (
      <section className={styles.section}>
        <h2>Restaurant Account Info</h2>
        {values.error && <p className={styles.error}>{values.error}</p>}
        <ul className={styles.container}>
          <li>Email:  <span>{values.email}</span></li>
          <li>Restaurant Name:  <span>{values.name}</span></li>
          <li>Cuisine:  <span>{values.cuisine}</span></li>
          <li>Phone Number:  <span>{values.phoneNumber}</span></li>
          <li>Restaurant Address:  <span>{values.address}</span></li>
          <li>Minimum Preparing Minutes:  <span>{values.minimumPreparingMinutes}</span></li>
        </ul>
        <h2>Open Hours</h2>
        <div className={styles.openHours}>
          <ul>
          {DAYS.map((DAY, idx) => (
            <li key={idx}>
              {DAY}:{' '}
              <span>
                {openHours.openHours[idx]?.length > 0
                ? `${profileTime(openHours.openHours[idx])}`
                : 'Closed'}
              </span>
            </li>
          ))}
          </ul>
        </div>
        <div className={styles.navbtns}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={this.back}>Back</button>
        </div>
      </section>
    );
  }
}

export default SignupFormConfirmation;
