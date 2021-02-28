import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItemText,
} from '@material-ui/core';

function profileTime(timeArr) {
  let timeStringArr = [];
  for (let time of timeArr) {
    var start = [
      String(
        Math.floor(time[0] / 100) % 12 === 0
          ? 12
          : Math.floor(time[0] / 100) % 12,
      ),
      ':',
      ('0' + String(time[0] % 100)).slice(-2),
      time[0] / 100 >= 12 ? ' PM' : ' AM',
    ].join('');
    let end = [
      String(
        Math.floor(time[1] / 100) % 12 === 0
          ? 12
          : Math.floor(time[1] / 100) % 12,
      ),
      ':',
      ('0' + String(time[1] % 100)).slice(-2),
      time[1] / 100 >= 12 ? ' PM' : ' AM',
    ].join('');
    timeStringArr.push(`${start} ~ ${end}`);
  }
  return timeStringArr.join(', ');
}

class Confirmation extends Component {
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
      <div>
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            marginTop={5}
          >
            <Typography variant="h4">
              Restaurant Account Info
            </Typography>
            {values.error && (
              <Alert severity="error">{values.error}</Alert>
            )}
            <List component="ul" display="block">
              <ListItemText primary={`Email: ${values.email}`} />
              <ListItemText
                primary={`Restaurant Name: ${values.name}`}
              />
              <ListItemText primary={`Cuisine: ${values.cuisine}`} />
              <ListItemText
                primary={`Phone Number: ${values.phoneNumber}`}
              />
              <ListItemText
                primary={`Restaurant Address: ${values.address}`}
              />
              <ListItemText
                primary={`Minimum Preparing Minutes: ${values.minimumPreparingMinutes}`}
              />
            </List>
            <Box marginTop={3}>
              <Typography variant="h4">Open Hours</Typography>
              <List component="ul" display="block">
                {DAYS.map((DAY, idx) => (
                  <ListItemText key={idx}>
                    {DAY}:{' '}
                    {openHours.openHours[idx]?.length > 0
                      ? `${profileTime(openHours.openHours[idx])}`
                      : 'Closed'}
                  </ListItemText>
                ))}
              </List>
            </Box>
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}

export default Confirmation;
