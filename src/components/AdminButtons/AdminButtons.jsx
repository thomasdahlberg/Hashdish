import React from 'react';
import styles from './AdminButtons.module.css';

const AdminButtons = (props) => {
    return (
        <div className={styles.admin}>
            <div className={styles.edit}>
                <button 
                    id={props.submitId} 
                    onClick={props.submitFunction}
                >
                    {props.submitTitle}
                </button>
            </div>
            <div className={styles.del}>
                <button 
                    id={props.cancelId}
                    onClick={props.cancelFunction}
                >
                    {props.cancelTitle}
                </button>
            </div>   
        </div>
    )

}

export default AdminButtons;