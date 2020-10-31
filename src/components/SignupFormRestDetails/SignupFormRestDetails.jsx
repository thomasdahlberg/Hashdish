import React, { Component } from 'react';
import styles from './SignupFormRestDetails.module.css';

function formatTime(time) {
  return [
    ('0' + String(Math.floor(time / 100))).slice(-2),
    ':',
    ('0' + String(time % 100)).slice(-2),
  ].join('');
}

function deformatTime(time) {
  let newTime = time.slice(0, 2) + time.slice(3);
  if (newTime[0] === '0') {
    newTime = newTime.slice(1);
  }
  return Number(newTime);
}

class SignupFormRestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  continue = (e) => {
    e.preventDefault();
    const { handleChange } = this.props;
    handleChange('openHours')({
      target: {
        value: JSON.stringify({
          country: 'US',
          openHours: this.state.openHourList,
          exceptions: {},
        }),
      },
    });
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  getInitialState() {
    return {
      openHourList: [[], [], [], [], [], [], []],
    };
  }

  render() {
    const { values, handleChange } = this.props;
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return (
      <div className={styles.section}>
        <h2 htmlFor="openHours">Open Hours</h2>
        <section>
          <form>
            {this.state.openHourList.map((blocks, idx) => (
              <div className={styles.openHours} key={days[idx]}>
                <p className={styles.days}>{days[idx]}</p>
                <div className={styles.blockcont}>
                {blocks.map((block, idx2) => (
                  <div className={styles.hourflex} key={idx2}>
                    <div>
                      <div className={styles.open}>
                        <label>Open:</label>
                        <input
                          type="time"
                          value={formatTime(this.state.openHourList[idx][idx2][0])}
                          onChange={(e) => {
                            var arr = this.state.openHourList;
                            arr[idx][idx2][0] = deformatTime(e.target.value);
                            this.setState({
                              openHourList: arr,
                            });
                          }}
                        />
                      </div>
                      <div className={styles.close}>
                        <label>Close:</label>
                        <input
                          type="time"
                          value={formatTime(this.state.openHourList[idx][idx2][1])}
                          onChange={(e) => {
                            var arr = this.state.openHourList;
                            arr[idx][idx2][1] = deformatTime(e.target.value);
                            this.setState({
                              openHourList: arr,
                            });
                          }}
                        />
                      </div>

                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        let arr = this.state.openHourList;
                        arr[idx] = arr[idx].filter((item) => item !== block);
                        this.setState({
                          openHourList: arr,
                        });
                      }}
                    >
                      -
                    </button>
                  </div>
                ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    let arr = this.state.openHourList;
                    arr[idx].push([0, 0]);
                    this.setState({
                      openHourList: arr,
                    });
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </form>
        </section>
        <div className={styles.prep}>
          <label htmlFor="minimumPreparingMinutes">
            Minimum Wait Time
          </label>
          <input
            onChange={handleChange('minimumPreparingMinutes')}
            defaultValue={values.minimumPreparingMinutes}
            placeholder={'Minimum Prep in Mins'}
            type="number"
          />
        </div>
        <div className={styles.navbtns}>
          <button onClick={this.continue}>Continue</button>
          <button onClick={this.back}>Back</button>
        </div>
      </div>
    );
  }
}

export default SignupFormRestDetails;
