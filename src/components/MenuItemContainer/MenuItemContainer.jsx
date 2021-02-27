import React, { Component } from 'react';
import EditMenuItem from '../EditItemForm/EditMenuItem/EditMenuItem';
import ViewMenuItem from '../ViewMenuItem/ViewMenuItem';

class MenuItemContainer extends Component {
  state = {
    parsedItemOptionDefs: this.parseOptionDefs(),
  };

  parseOptionDefs() {
    if (this.props.item.optionDefinitions) {
      try {
        return JSON.parse(this.props.item.optionDefinitions);
      } catch (error) {
        console.log(`Options Parsing Error: ${error}`);
      }
    }
    return {};
  }

  render() {
    if (this.props.item === this.props.selectedMenuItem) {
      return (
        <EditMenuItem
          key={this.props.idx}
          item={this.props.item}
          idx={this.props.idx}
          itemOptionalOptionDefs={
            this.state.parsedItemOptionDefs.optional
          }
          itemRequiredOptionDefs={
            this.state.parsedItemOptionDefs.required
          }
          handleMenuItemEdit={this.props.handleMenuItemEdit}
          handleMenuItemUpdate={this.props.handleMenuItemUpdate}
          handleMenuItemDelete={this.props.handleMenuItemDelete}
          handleMenuItemCancel={this.props.handleMenuItemCancel}
          handleGetKitchen={this.props.handleGetKitchen}
        />
      );
    } else {
      return (
        <ViewMenuItem
          key={this.props.idx}
          item={this.props.item}
          idx={this.props.idx}
          itemOptionalOptionDefs={
            this.state.parsedItemOptionDefs.optional
          }
          itemRequiredOptionDefs={
            this.state.parsedItemOptionDefs.required
          }
          delMenu={this.props.delMenu}
          handleDelMenu={this.props.handleDelMenu}
          handleClick={this.props.handleClick}
          handleMenuItemEdit={this.props.handleMenuItemEdit}
          handleMenuItemUpdate={this.props.handleMenuItemUpdate}
          handleMenuItemDelete={this.props.handleMenuItemDelete}
          handleMenuItemCancel={this.props.handleMenuItemCancel}
        />
      );
    }
  }
}

export default MenuItemContainer;
