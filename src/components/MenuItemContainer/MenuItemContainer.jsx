import React from 'react';
import EditMenuItem from '../EditItemForm/EditMenuItem/EditMenuItem';
import ViewMenuItem from '../ViewMenuItem/ViewMenuItem';

const MenuItemContainer = (props) => {
  if (props.item === props.selectedMenuItem) {
    return (
      <EditMenuItem
        key={props.idx}
        item={props.item}
        idx={props.idx}
        optionDefs={JSON.parse(props.item.optionDefinitions)}
        handleMenuItemEdit={props.handleMenuItemEdit}
        handleMenuItemUpdate={props.handleMenuItemUpdate}
        handleMenuItemDelete={props.handleMenuItemDelete}
        handleMenuItemCancel={props.handleMenuItemCancel}
        handleGetKitchen={props.handleGetKitchen}
      />
    );
  } else {
    return (
      <ViewMenuItem
        key={props.idx}
        item={props.item}
        idx={props.idx}
        delMenu={props.delMenu}
        handleDelMenu={props.handleDelMenu}
        handleClick={props.handleClick}
        handleMenuItemEdit={props.handleMenuItemEdit}
        handleMenuItemUpdate={props.handleMenuItemUpdate}
        handleMenuItemDelete={props.handleMenuItemDelete}
        handleMenuItemCancel={props.handleMenuItemCancel}
      />
    );
  }
};

export default MenuItemContainer;
