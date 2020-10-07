import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuItemForm from '../../components/MenuItemForm/MenuItemForm';
import MenuItems from '../../components/MenuItem/MenuItems';
import styles from './RestMenu.module.css';

const Menu = (props) => {
  return (
    <div>
      {props.myKitchen === null ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Menu Admin</h1>
            <button id="addMenuItem" onClick={props.handleClick}>
              +
            </button>
          </div>
          <div className={styles.form}>
            {props.menuItemForm ? (
              <MenuItemForm handleFormToggle={props.handleFormToggle} />
            ) : null}
          </div>
          <hr />
          <MenuItems />
        </div>
      )}
    </div>
  );
};

export default Menu;
