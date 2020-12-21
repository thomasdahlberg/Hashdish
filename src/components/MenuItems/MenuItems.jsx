import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuCategory from '../MenuCategory/MenuCategory';

const MenuItems = (props) => {
  return (
    <div>
      {props.menuItems ? (
        <div>
          {props.menuCats.map((category, idx) => (
            <MenuCategory
              category={category}
              key={idx}
              selectedMenuItem={props.selectedMenuItem}
              menuItems={props.menuItems}
              delMenu={props.delMenu}
              handleMenuItemEdit={props.handleMenuItemEdit}
              handleMenuItemUpdate={props.handleMenuItemUpdate}
              handleMenuItemDelete={props.handleMenuItemDelete}
              handleMenuItemCancel={props.handleMenuItemCancel}
              handleClick={props.handleClick}
              handleDelMenu={props.handleDelMenu}
            />
          ))}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default MenuItems;
