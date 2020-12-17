import React, { Component } from 'react';
import EditMenuItem from '../EditMenuItem/EditMenuItem';
import ViewMenuItem from '../ViewMenuItem/ViewMenuItem';

class MenuItemContainer extends Component {
    state = {
        parsedItemOptionDefs: this.parseOptionDefs()
    }

    parseOptionDefs() {
        if (this.props.item.optionDefinitions) {
            try {
                return JSON.parse(this.props.item.optionDefinitions)
            }
            catch (error) {
                console.log(`Options Parsing Error: ${error}`) 
            }
        }
        return {}
    }

    render() {
        if (
            this.props.item === this.props.selectedMenuItem &&
            this.props.item.category === this.props.category
        ) {
            return (
                <EditMenuItem
                    key={this.props.idx}
                    item={this.props.item}
                    idx={this.props.idx}
                    itemOptionalOptionDefs={this.state.parsedItemOptionDefs.optional}
                    itemRequiredOptionDefs={this.state.parsedItemOptionDefs.required}
                    handleMenuItemEdit={this.props.handleMenuItemEdit}
                    handleMenuItemUpdate={this.props.handleMenuItemUpdate}
                    handleMenuItemDelete={this.props.handleMenuItemDelete}
                    handleMenuItemCancel={this.props.handleMenuItemCancel}
                />
            );
        } else if (
            this.props.item.category === this.props.category && 
            this.props.item.status === 1
        ) {
            return (
                <ViewMenuItem
                    key={this.props.idx}
                    item={this.props.item}
                    idx={this.props.idx}
                    delMenu={this.props.delMenu}
                    handleDelMenu={this.props.handleDelMenu}
                    handleClick={this.props.handleClick}
                    handleMenuItemEdit={this.props.handleMenuItemEdit}
                    handleMenuItemUpdate={this.props.handleMenuItemUpdate}
                    handleMenuItemDelete={this.props.handleMenuItemDelete}
                    handleMenuItemCancel={this.props.handleMenuItemCancel}
                />
            )
        } else return null;
    }
}

export default MenuItemContainer;