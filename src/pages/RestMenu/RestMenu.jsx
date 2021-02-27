import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import MenuItems from '../../components/MenuItems/MenuItems';
import EditMenuItem from '../../components/EditItemForm/EditMenuItem/EditMenuItem';

import styles from './RestMenu.module.css';

const Menu = (props) => {
  return (
    <Container maxWidth="sm">
      {props.myKitchen === null ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.container}>
          {props.addMenuItem ? (
            <EditMenuItem
              addMenuItem={props.addMenuItem}
              selectedMenuItem={props.selectedMenuItem}
              handleGetKitchen={props.handleGetKitchen}
              handleFormToggle={props.handleFormToggle}
              handleAddItemForm={props.handleAddItemForm}
            />
          ) : (
            <div className={styles.add}>
              <Fab
                size="large"
                color="primary"
                aria-label="add"
                onClick={() => props.handleFormToggle('addMenuItem')}
              >
                <AddIcon />
              </Fab>
            </div>
          )}
          <div className={styles.content}>
            <h1>Menu Admin</h1>
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
              handleGetKitchen={props.handleGetKitchen}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Menu;
