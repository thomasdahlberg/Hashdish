import React from 'react';
import MenuItemContainer from '../MenuItemContainer/MenuItemContainer';
import styles from './MenuCategory.module.css';

const MenuCategory = (props) => {
  return (
    <div className={styles.container}>
      <h2>{props.category}</h2>
      <div className={styles.category}>
        {props.menuItems.map((item, idx) =>
          item.category === props.category && item.status === 0 || item.status === 1 ? (
            <MenuItemContainer
              key={idx}
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
              handleGetKitchen={props.handleGetKitchen}
            />
          ) : null,
        )}
      </div>
      <hr />
    </div>
  );
};

export default MenuCategory;
