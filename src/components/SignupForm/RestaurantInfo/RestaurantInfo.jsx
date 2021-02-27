import React, { Component } from 'react';
import {
  Button,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from '@material-ui/core';

class RestaurantInfo extends Component {
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
      <List component="ul" display="block" key={prediction.place_id}>
        <ListItem button divider>
          <ListItemText primary={prediction.description} />
        </ListItem>
      </List>
    ));

    return (
      <div>
        <Container maxWidth="sm">
          <Box margin={5}>
            <Box textAlign="center">
              <Typography variant="h4">Sign Up</Typography>
            </Box>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              defaultValue={values.email}
              onChange={handleChange('email')}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Password"
              name="password"
              type="password"
              defaultValue={values.password}
              onChange={handleChange('password')}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Password Confirmation"
              name="password"
              type="password"
              defaultValue={values.passwordConfirmation}
              onChange={handleChange('password')}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Restaurant Name"
              name="restaurant name"
              type="text"
              defaultValue={values.name}
              onChange={handleChange('name')}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Phone Number"
              name="phone number"
              type="tel"
              defaultValue={values.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Restaurant Address"
              name="restaurant address"
              type="text"
              id="autocomplete"
              placeholder={'Enter your restaurant name. Ex) HashDish'}
              defaultValue={values.address}
              onChange={handleAddressChange('address')}
            />
            <Typography onClick={handlePlaceChange}>
              {predictions}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            marginTop={3}
            marginBottom={5}
          >
            <Box marginRight={3}>
              <Button disabled variant="contained" color="secondary">
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

export default RestaurantInfo;
