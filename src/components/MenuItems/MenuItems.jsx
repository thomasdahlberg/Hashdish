import React from 'react';
import styles from './MenuItems.module.css';
import { Redirect } from 'react-router-dom';
import MenuItemEdit from '../MenuItemEdit/MenuItemEdit';
import MenuItemView from '../MenuItemView/MenuItemView';

const MenuItems = (props) => {
    return(
        <div>
            {props.menuItems ?
                <div>
                    {props.menuCats.map((category, idx) =>
                        <div key={category} className={styles.container}>
                            <h1>{category}</h1>
                        <div id={idx} key={category} className={styles.category}>
                            {props.menuItems.map((item, idx) => {
                                if (item === props.selectedMenuItem) {
                                    return item.category === category ?
                                        <MenuItemEdit
                                            key={idx}
                                            handleMenuItemEdit={props.handleMenuItemEdit}
                                            handleMenuItemUpdate={props.handleMenuItemUpdate}
                                            handleMenuItemDelete={props.handleMenuItemDelete}
                                            handleMenuItemCancel={props.handleMenuItemCancel}
                                            item={item}
                                            idx={idx} />
                                        : null
                                }
                                else {
                                    return item.category === category ?
                                        <MenuItemView
                                            key={idx}
                                            handleClick={props.handleClick}
                                            handleDelMenu={props.handleDelMenu}
                                            handleMenuItemEdit={props.handleMenuItemEdit}
                                            handleMenuItemUpdate={props.handleMenuItemUpdate}
                                            handleMenuItemDelete={props.handleMenuItemDelete}
                                            handleMenuItemCancel={props.handleMenuItemCancel}
                                            item={item}
                                            delMenu={props.delMenu}
                                            idx={idx} />
                                        : null
                                }
                            })}
                        </div>
                        <hr/>
                    </div>
                    )}
                </div>
                :
                <Redirect to="/" />
            }
        </div>
    )
}

export default MenuItems;