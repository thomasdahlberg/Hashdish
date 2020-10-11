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
              Add New Item
            </button>
          </div>
          <div className={styles.form}>
            {props.menuItemForm ? (
              <MenuItemForm 
                selectedMenuItem={props.selectedMenuItem}
                handleGetKitchen={props.handleGetKitchen}
                handleFormToggle={props.handleFormToggle}
                handleClick={props.handleClick}
              />
            ) : null}
          </div>
          <hr />
          <MenuItems
            selectedMenuItem={props.selectedMenuItem}
            menuItems={props.menuItems}
            menuCats={props.menuCats}
            handleMenuItemEdit={props.handleMenuItemEdit}
            handleMenuItemUpdate={props.handleMenuItemUpdate}
            handleMenuItemDelete={props.handleMenuItemDelete}
            handleMenuItemCancel={props.handleMenuItemCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Menu;
