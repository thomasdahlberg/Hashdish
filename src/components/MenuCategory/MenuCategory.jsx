import React from 'react';
import EditMenuItem from '../EditMenuItem/EditMenuItem';
import ViewMenuItem from '../ViewMenuItem/ViewMenuItem';
import styles from './MenuCategory.module.css';

const MenuCategory = (props) => {
  return (
    <div className={styles.container}>
      <h2>{props.category}</h2>
      <div className={styles.category}>
        {props.menuItems.map((item, idx) => {
          if (
            item === props.selectedMenuItem &&
            item.category === props.category
          ) {
            return (
              <EditMenuItem
                key={idx}
                handleMenuItemEdit={props.handleMenuItemEdit}
                handleMenuItemUpdate={props.handleMenuItemUpdate}
                handleMenuItemDelete={props.handleMenuItemDelete}
                handleMenuItemCancel={props.handleMenuItemCancel}
                item={item}
                idx={idx}
              />
            );
          } else if (item.category === props.category && item.status === 1) {
            return (
              <ViewMenuItem
                key={idx}
                handleClick={props.handleClick}
                handleDelMenu={props.handleDelMenu}
                handleMenuItemEdit={props.handleMenuItemEdit}
                handleMenuItemUpdate={props.handleMenuItemUpdate}
                handleMenuItemDelete={props.handleMenuItemDelete}
                handleMenuItemCancel={props.handleMenuItemCancel}
                item={item}
                delMenu={props.delMenu}
                idx={idx}
              />
            );
          } else return null;
        })}
      </div>
      <hr />
    </div>
  );
};

export default MenuCategory;
