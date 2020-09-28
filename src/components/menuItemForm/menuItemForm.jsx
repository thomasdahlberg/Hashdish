import React, { Component } from 'react';
import styles from './MenuItemForm.module.css';

class MenuItemForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      name: null,
      description: null,
      image: null,
      price: null,
    };
  }

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

  render() {
    return (
      <form action="" className={styles.container}>
        <h2>Add A New Menu Item</h2>
        <label htmlFor="image">Select Item Image:</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={this.handleImageChange}
        />
        <label htmlFor="name">Menu Item Name:</label>
        <input id="name" name="name" type="text" onChange={this.handleChange} />
        <label htmlFor="description">Description:</label>
        <textarea
          rows="4"
          cols="50"
          maxLength="200"
          className={styles.description}
          id="description"
          name="description"
          onChange={this.handleChange}
        />
        <label htmlFor="name">Menu Item Price:</label>
        <input
          id="price"
          name="price"
          type="text"
          onChange={this.handleChange}
        />
        <div className={styles.buttons}>
          <button>Submit</button>
          <button>Cancel</button>
        </div>
      </form>
    );
  }
}

export default MenuItemForm;
