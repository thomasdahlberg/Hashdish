import React, { Component } from 'react';
import RestaurantInfo from './RestaurantInfo/RestaurantInfo';
import Confirmation from './Confirmation/Confirmation';
import Success from './Success/Success';
import { axiosApiInstance as API } from '../../utils/axiosConfig';

class SignupForm extends Component {
  state = {
    step: 1,
    name: '',
    password: '',
    passwordConfirmation: '',
    phoneNumber: '',
    email: '',
    latitude: '',
    longitude: '',
    address: '',
    googlePlaceId: '',
    timezone: 'America/Los_Angeles',
    predictions: [],
    error: '',
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleAddressChange = (input) => async (e) => {
    this.setState({ [input]: e.target.value });
    await API.get(
      `/google/place/autocomplete?text=${e.target.value}&types=establishment`,
    )
      .then((response) => {
        this.setState({ predictions: response.data.predictions });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePlaceChange = async (e) => {
    window.document.getElementById(
      'autocomplete',
    ).value = e.target.innerText.slice(0, -5);
    await API.get(
      `/google/place/autocomplete?text=${e.target.innerText}&types=establishment`,
    ).then((response) => {
      this.setState({
        googlePlaceId: response.data.predictions[0].place_id,
      });
    });

    await API.get(
      `google/place/details?place_id=${this.state.googlePlaceId}`,
    )
      .then((response) => {
        this.setState({
          latitude: response.data.result.geometry.location.lat,
        });
        this.setState({
          longitude: response.data.result.geometry.location.lng,
        });
        this.setState({
          address: response.data.result.formatted_address.slice(
            0,
            -5,
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
      name,
      phoneNumber,
      latitude,
      longitude,
      address,
      timezone,
      googlePlaceId,
    } = this.state;

    await API.post('/kitchen', {
      email,
      password,
      name,
      phoneNumber,
      latitude,
      longitude,
      address,
      timezone,
      googlePlaceId,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.nextStep();
        }
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };

  render() {
    const { step } = this.state;
    const {
      name,
      password,
      passwordConfirmation,
      email,
      phoneNumber,
      latitude,
      longitude,
      address,
      googlePlaceId,
      timezone,
      predictions,
      error,
    } = this.state;

    const values = {
      name,
      password,
      passwordConfirmation,
      email,
      phoneNumber,
      latitude,
      longitude,
      address,
      googlePlaceId,
      timezone,
      predictions,
      error,
    };

    switch (step) {
      case 1:
        return (
          <RestaurantInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleAddressChange={this.handleAddressChange}
            handlePlaceChange={this.handlePlaceChange}
            values={values}
          />
        );

      case 2:
        return (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            handleSubmit={this.handleSubmit}
          />
        );

      case 3:
        return <Success />;

      default:
    }
  }
}

export default SignupForm;
