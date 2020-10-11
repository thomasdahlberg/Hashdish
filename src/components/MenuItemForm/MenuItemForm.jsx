import React, { Component } from 'react';
import styles from './MenuItemForm.module.css';
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
        };
    }

    isFormValid = () => {
        return (
            this.state.category &&
            this.state.name &&
            this.state.price
        );
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/kitchen/menu', this.state).then(async (response) => {
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
                {this.state.image &&          
                    <img src={this.state.image} alt="menu item"/>
                }
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
                <label htmlFor="name">Menu Item Price:</label>
                <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.price}
                    placeholder="Ex) 9.99"
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
