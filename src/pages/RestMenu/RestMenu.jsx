import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MenuItemForm from '../../components/MenuItemForm/MenuItemForm';
import MenuItems from '../../components/MenuItems/MenuItems';
import styles from './RestMenu.module.css';

class Menu extends Component {
  
  componentWillUnmount = () => {
    if(this.props.menuItemForm){
      this.props.handleFormToggle("addMenuItem");
    }
  }

  render() {
    return (
      <div>
        {this.props.myKitchen === null ? (
          <Redirect to="/" />
        ) : (
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Menu Admin</h1>
              { !this.props.menuItemForm ? 
                <button onClick={()=>this.props.handleFormToggle("addMenuItem")}>Add New Item</button>
                :
                null
              }
            </div>
            <div className={styles.form}>
              {this.props.menuItemForm ? (
                <MenuItemForm
                  menuItemForm={this.props.menuItemForm} 
                  selectedMenuItem={this.props.selectedMenuItem}
                  handleGetKitchen={this.props.handleGetKitchen}
                  handleFormToggle={this.props.handleFormToggle}
                  handleClick={this.props.handleClick}
                />
              ) : null}
            </div>
            <hr />
            <MenuItems
              delMenu={this.props.delMenu}
              selectedMenuItem={this.props.selectedMenuItem}
              menuItems={this.props.menuItems}
              menuCats={this.props.menuCats}
              handleDelMenu={this.props.handleDelMenu}
              handleClick={this.props.handleClick}
              handleMenuItemEdit={this.props.handleMenuItemEdit}
              handleMenuItemUpdate={this.props.handleMenuItemUpdate}
              handleMenuItemDelete={this.props.handleMenuItemDelete}
              handleMenuItemCancel={this.props.handleMenuItemCancel}
            />
          </div>
        )}
      </div>
    );
  }
};

export default Menu;
