import React, { Component } from 'react';
import styles from './UpdatePhoto.module.css';
import kitchenInstance from '../../utils/axiosConfig';

const API = kitchenInstance;

class UpdatePhoto extends Component {
    constructor(props){
        super(props)
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            image: null
        }
    }

    isFormValid = () => {
        return this.state.image;
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
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await API.patch(`/kitchen/picture`, {data: this.state.image.split(',')[1]}).then((response) => {
            if (response.status === 200) {
                console.log(response);
            }
        });
        this.props.handleFormToggle("editProfPhoto");
        this.props.handleGetKitchen();
    }

    render() {
        return(
            <div className={styles.container}>
                <form onSubmit={this.handleSubmit}>
                    <h3>Update Profile Image</h3>
                    <div className ={styles.inputs}>
                        {this.state.image &&
                            <img src={this.state.image} alt="restaurant logo"/>
                        }
                        <label htmlFor="image">Upload Image:</label>
                        <input 
                            id="image" 
                            name="image" 
                            type="file" 
                            accept="image/*"
                            width="50"
                            height="50"
                            onChange={this.handleImageChange}
                        />
                    </div>
                    <div className={styles.btns}>
                        <button disabled={!this.isFormValid()} type="submit">Update</button>
                        <button className={styles.cancel} id="editProfPhoto" onClick={this.props.handleClick}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdatePhoto;