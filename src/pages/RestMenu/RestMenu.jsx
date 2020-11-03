import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuItemForm from '../../components/MenuItemForm/MenuItemForm';
import MenuItems from '../../components/MenuItems/MenuItems';
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
            { !props.menuItemForm ? 
              <button id="addMenuItem" onClick={props.handleClick}>Add New Item</button>
              :
              null
            }
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
            delMenu={props.delMenu}
            selectedMenuItem={props.selectedMenuItem}
            menuItems={props.menuItems}
            menuCats={props.menuCats}
            handleDelMenu={props.handleDelMenu}
            handleClick={props.handleClick}
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
