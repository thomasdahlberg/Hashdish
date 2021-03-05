import React from 'react';
import styles from './AdminButtons.module.css';
import { Button } from '@material-ui/core';

const AdminButtons = (props) => {
  return (
    <div className={styles.admin}>
      <div className={styles.edit}>
        <Button
          variant="contained"
          color="primary"
          id={props.submitId}
          onClick={props.submitFunction}
        >
          {props.submitTitle}
        </Button>
      </div>
      <div className={styles.del}>
        <Button
          variant="contained"
          color="secondary"
          id={props.cancelId}
          onClick={props.cancelFunction}
        >
          {props.cancelTitle}
        </Button>
      </div>
    </div>
  );
};

export default AdminButtons;
