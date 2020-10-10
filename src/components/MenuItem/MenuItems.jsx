import React from 'react';
import styles from './MenuItems.module.css';
import { Redirect } from 'react-router-dom';

function renderOptions(title, optionGroups) {
    return optionGroups?.map((optionGroup, idx) => {
        return <div>
            <div key={`${idx}`} className={styles.optionGroupTitle}>
                <p>[{title}] {optionGroup.name} ({optionGroup.option_type})</p>
            </div>
            {optionGroup.options.length > 0 &&
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Additional Price</th>
                            <th>Default</th>
                            <th>Sold Out</th>
                        </tr>
                        {optionGroup.options.map((option, idx) => {
                            return <tr>
                                <td key={`${idx}name`}>{option.name}</td>
                                <td key={`${idx}price`}>${option.price}</td>
                                <td key={`${idx}default`}><input type='checkbox' defaultChecked={option.default}/></td>
                                <td key={`${idx}availability`}><input type='checkbox' defaultChecked={option.availability}/></td>
                            </tr>                                                                
                        })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    })
}

const MenuItems = (props) => {
    return(
        <div>
            {props.menuItems ?
                <div className={styles.container}>
                    {props.menuCats.map((category, idx) => 
                        <div key={category} className={styles.container}>
                            <h1>{category}</h1>
                        <div id={idx} key={category} className={styles.category}>
                            {props.menuItems.map((item, idx) => {
                                let optionDefinitions = {}
                                if (item.optionDefinitions) {
                                    try {
                                        optionDefinitions = JSON.parse(item.optionDefinitions)
                                    }
                                    catch {}
                                }
                                return item.category === category ? 
                                    <section id={item.menuId} key={item.menuId} className={styles.item}>
                                        <div className={styles.title}>
                                            <h3>{item.name}</h3>
                                            <img src={item.pictureKey} alt="menu item"/>
                                        </div>
                                        <div className={styles.description}>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={styles.description}>
                                            {renderOptions('Required', optionDefinitions.required)}
                                        </div>
                                        <div className={styles.description}>
                                            {renderOptions('Optional', optionDefinitions.optional)}
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