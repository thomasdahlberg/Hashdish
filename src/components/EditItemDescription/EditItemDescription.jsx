import React from 'react';
import styles from './EditItemDescription.module.css';

const EditItemDescription = (props) => {
    return (
        <div className={styles.title}>
            <div>
                <label>Item Name</label>
                <input
                    name="name"
                    type="text"
                    value={props.itemName}
                    onChange={props.handleChange}
                />
            </div>
            <div>
                <label>Item Image</label>
                {props.itemImage && <img src={props.itemImage} alt="menu item"/>}
                <input 
                    id="image" 
                    name="image" 
                    type="file" 
                    accept="image/*"
                    width="50"
                    height="50"
                    onChange={props.handleImageChange}
                />
            </div>
            <div className={styles.description}>
                <label>Item Description</label>
                <textarea
                    name="description"
                    type="text"
                    rows={3}
                    value={props.itemDescription}
                    onChange={props.handleChange}
                />
            </div>
            <div className={styles.price}>
                <label>Item Price</label>
                <input
                    name="price"
                    type="text"
                    value={props.itemPrice}
                    onChange={props.handleChange}
                />
            </div>
        </div>
    )
}

export default EditItemDescription;