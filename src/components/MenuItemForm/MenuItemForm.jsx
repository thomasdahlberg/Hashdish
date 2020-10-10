import React, { Component } from 'react';
import styles from './MenuItemForm.module.css';
import kitchenInstance from '../../utils/axiosConfig';

const API = kitchenInstance;

class MenuItemForm extends Component {
    state = this.getInitialState();

    getInitialState() {
        return {
            category: this.props.selectedMenuItem?.category,
            name: this.props.selectedMenuItem?.name,
            price: this.props.selectedMenuItem?.price,
            dietaryRestriction: this.props.selectedMenuItem?.dietaryRestriction,
            description: this.props.selectedMenuItem?.description || '',
            optionDefinitions: this.props.selectedMenuItem?.optionDefinitions || '',
            status: this.props.selectedMenuItem?.status || true,
            image: (this.props.selectedMenuItem) ? `https://homecookimages.blob.core.windows.net/pictures/${this.props.selectedMenuItem?.pictureKey}.jpg` : null,
            error: '',
        };
    }

    isFormValid = () => {
        return (
            this.state.category &&
            this.state.name &&
            this.state.price &&
            this.state.dietaryRestriction &&
            this.state.description
        );
    };
    
    resizeImage = (file) => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onloadend = (e) => {
                var image = new Image();
                image.onload = () => {
                    var canvas = document.createElement("canvas");
                    var MAX_WIDTH = 300;
                    var MAX_HEIGHT = 300;
                    canvas.width = MAX_WIDTH;
                    canvas.height = MAX_HEIGHT;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT);

                    let imageURL = canvas.toDataURL(file.type)
                    this.setState({
                        image: imageURL
                    })
                }
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }

    handleImageChange = async (e) => {
        this.resizeImage(e.target.files[0])
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleCheckbox = (e) => {
        console.log(e.target.checked)
        this.setState({
            [e.target.name]: !this.state[e.target.name],
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.props.selectedMenuItem)
        try {
            if (this.props.selectedMenuItem) {
                await API.patch(`/kitchen/menu/${this.props.selectedMenuItem.menuId}`, this.state).then(async (response) => {
                    if (response.status === 200) {
                        console.log(response);
                        await API.patch(`/kitchen/menu/picture/${this.props.selectedMenuItem.menuId}`, {data: this.state.image.split(',')[1]}).then((response) => {
                            if (response.status === 200) {
                                console.log(response);
                            }
                        });
                    }
                });
            }
            else {
                await API.post('/kitchen/menu', this.state).then(async (response) => {
                    if (response.status === 200) {
                        console.log(response);
                        await API.patch(`/kitchen/menu/picture/${this.props.selectedMenuItem.menuId}`, {data: this.state.image.split(',')[1]}).then((response) => {
                            if (response.status === 200) {
                                console.log(response);
                            }
                        });
                    }
                });
            }
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
                {this.state.image &&          
                    <img src={this.state.image} alt="menu item"/>
                }
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
                <div>
                    <label htmlFor="status">Sold out</label>
                    <input
                        id="status"
                        name="status"
                        type="checkbox"
                        onChange={this.handleCheckbox}
                        checked={this.state.status}
                    />
                </div>
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
