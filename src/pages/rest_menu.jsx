import React from 'react';
import MenuItems from '../components/menu_item/menu_items';



const Menu = (props) => {
    return(
        <div>
            <h1 style={{marginLeft: "1.45rem"}}>Menu</h1>
            <MenuItems/>
        </div>
    )
}

export default Menu;