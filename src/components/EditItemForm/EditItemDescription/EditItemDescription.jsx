import React from 'react';
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './EditItemDescription.module.css';
import classes from './EditItemDescription.module.css';

const EditItemDescription = (props) => {
  return (
    <div className={styles.title}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Item Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.description}>
            <div className={styles.field}>
              <label>Item Name</label>
              <input
                name="name"
                type="text"
                value={props.itemName}
                onChange={props.handleChange}
              />
            </div>
            <div className={styles.field}>
              <label>Item Description</label>
              <textarea
                name="description"
                type="text"
                rows={5}
                value={props.itemDescription}
                onChange={props.handleChange}
              />
            </div>
            <div className={styles.field}>
              <label>Item Price</label>
              <input
                name="price"
                type="text"
                value={props.itemPrice}
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EditItemDescription;
