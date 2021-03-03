import React, { Component } from 'react';
import { axiosApiInstance as API } from '../../utils/axiosConfig';
import LocalStorageService from '../../utils/localStorageService';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://source.unsplash.com/collection/386111)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  alert: {
    marginTop: theme.spacing(2),
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      HashDish {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    isChecked: false,
    error: '',
  };

  componentDidMount() {
    if (localStorage.username && localStorage.checkbox !== '') {
      this.setState({
        email: localStorage.username,
        isChecked: true,
      });
    }
  }

  isFormValid = () => {
    return this.state.email && this.state.password;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheckboxChange = (event) => {
    this.setState({
      isChecked: event.target.checked,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { email, password, isChecked } = this.state;
    if (isChecked && email !== '') {
      localStorage.setItem('username', email);
      localStorage.setItem('checkbox', isChecked);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('checkbox');
    }
    await API.post(
      `/kitchen/authorize?email=${email}&password=${password}`,
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          LocalStorageService.setToken(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: 'Failed to log in' });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    this.props.handleSignupOrLogin();
    LocalStorageService.getAuthToken()
      ? this.props.history.push('/')
      : this.props.history.push('/login');
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      isLoading,
      isChecked,
      error,
    } = this.state;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className={classes.image}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {error && (
              <Alert className={classes.alert} severity="error">
                {error}
              </Alert>
            )}
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={this.handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={this.handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.isFormValid()}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginForm);
