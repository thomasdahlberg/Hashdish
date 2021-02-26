import React, { Component } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

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

class RestaurantDetails extends Component {
  state = {
    openHourList: [[], [], [], [], [], [], []],
  };

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
      <div>
        <Container maxWidth="sm">
          <Box marginTop={5} textAlign="center">
            <Typography variant="h4">Open Hours</Typography>
          </Box>
          <form>
            {this.state.openHourList.map((blocks, idx) => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                margin={4}
                key={days[idx]}
              >
                <Box marginRight={3}>
                  <Typography variant="body1">{days[idx]}</Typography>
                </Box>
                <Box>
                  {blocks.map((block, idx2) => (
                    <Box marginTop={3} marginBottom={3} key={idx2}>
                      <TextField
                        label="Open"
                        type="time"
                        value={formatTime(
                          this.state.openHourList[idx][idx2][0],
                        )}
                        onChange={(e) => {
                          var arr = this.state.openHourList;
                          arr[idx][idx2][0] = deformatTime(
                            e.target.value,
                          );
                          this.setState({
                            openHourList: arr,
                          });
                        }}
                      />
                      <Box marginTop={1}>
                        <TextField
                          label="Close"
                          type="time"
                          value={formatTime(
                            this.state.openHourList[idx][idx2][1],
                          )}
                          onChange={(e) => {
                            var arr = this.state.openHourList;
                            arr[idx][idx2][1] = deformatTime(
                              e.target.value,
                            );
                            this.setState({
                              openHourList: arr,
                            });
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            let arr = this.state.openHourList;
                            arr[idx] = arr[idx].filter(
                              (item) => item !== block,
                            );
                            this.setState({
                              openHourList: arr,
                            });
                          }}
                        >
                          <DeleteIcon
                            fontSize="large"
                            color="secondary"
                          />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Button
                  type="button"
                  onClick={() => {
                    let arr = this.state.openHourList;
                    arr[idx].push([0, 0]);
                    this.setState({
                      openHourList: arr,
                    });
                  }}
                >
                  <AddCircleIcon fontSize="large" color="primary" />
                </Button>
              </Box>
            ))}
          </form>
          <Box display="block" marginTop={3} marginBottom={3}>
            <TextField
              onChange={handleChange('minimumPreparingMinutes')}
              defaultValue={values.minimumPreparingMinutes}
              type="number"
              label="Minimum Wait Time"
              placeholder="Minimum Prep in Mins"
              variant="outlined"
              fullWidth
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            marginTop={3}
            marginBottom={3}
          >
            <Box marginRight={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.back}
              >
                Back
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={this.continue}
            >
              Continue
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default RestaurantDetails;
