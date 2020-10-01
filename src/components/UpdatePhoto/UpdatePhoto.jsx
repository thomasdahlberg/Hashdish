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

    handleImageChange = e => {
        this.setState({
            image: e.target.files[0],
        })
    }

    handleSubmit = e => {
        console.log(this.state.image)
    }

    render() {
        return(
            <div className={styles.container}>
                <form onSubmit={this.handleSubmit}>
                    <h3>Update Profile Image</h3>
                    <div className ={styles.inputs}>
                        <label htmlFor="image">Upload Image:</label>
                        <input 
                            id="image" 
                            name="image" 
                            type="file" 
                            accept="image/*"
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