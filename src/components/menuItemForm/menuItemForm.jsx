import React, { Component } from 'react';
import styles from './menuItemForm.module.css';
import kitchenInstance from '../../utils/axiosConfig';

const API = kitchenInstance;

class MenuItemForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      category: '',
      name: '',
      price: '',
      dietaryRestriction: '',
      description: '',
      optionDefinitions: '',
      // image: '',
      error: '',
    };
  }

  isFormValid = () => {
    return (
      this.state.category &&
      this.state.name &&
      this.state.price &&
      this.state.dietaryRestriction &&
      this.state.description &&
      this.state.optionDefinitions
    );
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/kitchen/menu', this.state).then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      });
    } catch (error) {
      this.setState({
        category: '',
        name: '',
        price: '',
        dietaryRestriction: '',
        description: '',
        optionDefinitions: '',
        // image: '',
        error: error.message,
      });
      console.log(error.message);
    }
    this.props.handleFormToggle("addMenuItem");
    this.props.handleGetKitchen();
  };

  render() {
    return (
      <form id="addMenuItem" onSubmit={this.handleSubmit} className={styles.container}>
        <h2>Add A New Menu Item</h2>
        <label htmlFor="image">Select Item Image:</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={this.handleImageChange}
        />
        <label htmlFor="name">Menu Item Category:</label>
        <input
          id="category"
          name="category"
          type="text"
          onChange={this.handleChange}
          value={this.state.category}
          placeholder="Category"
        />
        <label htmlFor="name">Menu Item Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
          placeholder="Name"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          rows="4"
          cols="50"
          maxLength="200"
          className={styles.description}
          id="description"
          name="description"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <label htmlFor="name">Menu Item Price:</label>
        <input
          id="price"
          name="price"
          type="text"
          onChange={this.handleChange}
          value={this.state.price}
          placeholder="Ex) 9.99"
        />
        <label htmlFor="name">Menu Item Dietary Restriction:</label>
        <input
          id="dietaryRestriction"
          name="dietaryRestriction"
          type="text"
          onChange={this.handleChange}
          value={this.state.dietaryRestriction}
        />
        <label htmlFor="name">Menu Item Option Definitions:</label>
        <input
          id="optionDefinitions"
          name="optionDefinitions"
          type="text"
          onChange={this.handleChange}
          value={this.state.optionDefinitions}
        />
        <div className={styles.buttons}>
          <button disabled={!this.isFormValid()} type="submit">
            Submit
          </button>
          <button id="addMenuItem" onClick={this.props.handleClick}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default MenuItemForm;
