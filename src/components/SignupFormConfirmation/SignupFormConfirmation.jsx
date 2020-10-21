import React, { Component } from 'react';
import styles from './SignupFormConfirmation.module.css';

function profileTime(timeArr) {
    let timeStringArr = []
    for(var time of timeArr) {
        var start = [String((Math.floor(time[0] / 100) % 12 === 0) ? 12 : Math.floor(time[0] / 100) % 12),":",('0' + String(time[0] % 100)).slice(-2), (time[0] / 100 >= 12) ? ' PM' : ' AM'].join("")
        var end = [String((Math.floor(time[1] / 100) % 12 === 0) ? 12 : Math.floor(time[1] / 100) % 12),":",('0' + String(time[1] % 100)).slice(-2), (time[0] / 100 >= 12) ? ' PM' : ' AM'].join("")
        timeStringArr.push(`${start} ~ ${end}`)
    }
    return timeStringArr.join(', ')
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
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const openHours = JSON.parse(values.openHours)
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
          <section className={styles.info}>
              {DAYS.map((DAY, idx) => 
                  <p key={idx}>{DAY}: {openHours.openHours[idx]?.length > 0 ? `${profileTime(openHours.openHours[idx])}` : "Closed"}</p>
              )}
          </section>
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
