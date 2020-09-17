import React from 'react';
import MenuItemForm from '../../components/menuItemForm/menuItemForm';
import MenuItems from '../../components/menu_item/menu_items';
import styles from './rest_menu.module.css';



const Menu = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Menu Admin</h1>
                <button id="addMenuItem" onClick={props.handleClick}>+</button>
            </div>
            <div className={styles.form}>
                {props.menuItemForm ? <MenuItemForm /> : null}
            </div>
            <hr/>
            <MenuItems/>
        </div>
    )
}

export default Menu;