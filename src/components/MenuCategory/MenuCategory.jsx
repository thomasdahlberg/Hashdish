import React from 'react';
import MenuItemContainer from '../MenuItemContainer/MenuItemContainer';
import styles from './MenuCategory.module.css';

const MenuCategory = (props) => {
  return (
    <div className={styles.container}>
      <h2>{props.category}</h2>
      <div className={styles.category}>
        { props.menuItems.map((item, idx) => 
          <MenuItemContainer 
            item={item} 
            idx={idx}
            category={props.category}
            selectedMenuItem={props.selectedMenuItem}
            delMenu={props.delMenu}
            handleDelMenu={props.handleDelMenu}
            handleClick={props.handleClick}
            handleMenuItemEdit={props.handleMenuItemEdit}
            handleMenuItemUpdate={props.handleMenuItemUpdate}
            handleMenuItemDelete={props.handleMenuItemDelete}
            handleMenuItemCancel={props.handleMenuItemCancel}
          /> 
        )}
      </div>
      <hr />
    </div>
  );
};

export default MenuCategory;