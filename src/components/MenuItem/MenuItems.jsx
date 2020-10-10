import React from 'react';
import styles from './MenuItems.module.css';
import { Redirect } from 'react-router-dom';

const MenuItems = (props) => {
    return(
        <div>
            {props.menuItems ?
                <div className={styles.container}>
                    {props.menuCats.map((category, idx) => 
                        <div key={category} className={styles.container}>
                            <h1>{category}</h1>
                        <div id={idx} key={category} className={styles.category}>
                            {props.menuItems.map((item, idx) => 
                                item.category === category ? 
                                    <section id={item.menuId} key={item.menuId}className={styles.item}>
                                        <div className={styles.title}>
                                            <h3>{item.name}</h3>
                                            {item.pictureKey &&
                                                <img src={`https://homecookimages.blob.core.windows.net/pictures/${item.pictureKey}.jpg`} alt="menu item"/>
                                            }
                                        </div>
                                        <div className={styles.description}>
                                            <p>{item.description}</p>
                                            {/* {item.optionDefinitions ? 
                                                <p>{item.optionDefinitions}</p>
                                                :
                                                null
                                            }
                                            {item.dietaryRestriction ?
                                                <p>{item.dietaryRestriction}</p>
                                                :
                                                null
                                            } */}
                                        </div>
                                        <div className={styles.price}>
                                            <p>{item.price}</p>
                                            <div className={styles.admin}>
                                                <div className={styles.edit}>
                                                    <button id={item.menuId} onClick={() => { props.handleMenuItemEdit(idx) }}>Edit</button>
                                                </div>
                                                <div className={styles.del}>
                                                    <button id={item.menuId} onClick={props.handleMenuItemDelete}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    :
                                    null
                            )}
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