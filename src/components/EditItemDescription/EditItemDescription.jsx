import React from 'react';
import styles from './EditItemDescription.module.css';

const EditItemDescription = (props) => {
  return (
    <div className={styles.title}>
      <div className={styles.description}>
        <div className={styles.field}>
          <label>IsActive</label>
          <input
            name="isActive"
            type="checkbox"
            checked={props.itemIsActive}
            onChange={props.handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Item Name</label>
          <input
            name="name"
            type="text"
            value={props.itemName || ''}
            onChange={props.handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Item Description</label>
          <textarea
            name="description"
            type="text"
            rows={5}
            value={props.itemDescription || ''}
            onChange={props.handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Item Price</label>
          <input
            name="price"
            type="text"
            value={props.itemPrice || ''}
            onChange={props.handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Max Amount Per Order</label>
          <input
            name="maxAmountPerOrder"
            type="text"
            value={props.itemMaxAmountPerOrder || ''}
            onChange={props.handleChange}
          />
        </div>
      </div>
      <div className={styles.image}>
        <label>Item Image</label>
        {props.itemImage && (
          <img src={props.itemImage} alt="menu item" />
        )}
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
    </div>
  );
};

export default EditItemDescription;
