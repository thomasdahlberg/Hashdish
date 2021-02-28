import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Container,
  Typography,
} from '@material-ui/core';

class SignupFormSuccess extends Component {
  render() {
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
            <Typography variant="h4">Sign Up Complete!</Typography>
            <Box marginTop={3}>
              <Typography variant="h5">
                Click the button below to log in.
              </Typography>
            </Box>
            <Link to="/login">
              <Box marginTop={3} marginBottom={3}>
                <Button variant="contained" color="primary">
                  Log In
                </Button>
              </Box>
            </Link>
          </Box>
        </Container>
      </div>
    );
  }
}

export default SignupFormSuccess;
