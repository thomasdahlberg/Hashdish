import React, { Component } from 'react';
import styles from './MenuItemView.module.css';

const STORAGE_URL = process.env.NODE_ENV === 'production' ?
    'https://hashdish.blob.core.windows.net/'
    :
    'https://homecookimages.blob.core.windows.net/';

class MenuItemView extends Component { //eslint-disable-line no-unused-vars
    renderOptions(title, optionGroups) {
        return optionGroups?.map((optionGroup, idx) => {
            return <div key={idx}>
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
                                return <tr key={idx}>
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

    render() {
        let optionDefinitions = {}
        if (this.props.item.optionDefinitions) {
            try {
                optionDefinitions = JSON.parse(this.props.item.optionDefinitions)
            }
            catch {}
        } 
        return <section id={this.props.item.menuId} key={this.props.item.menuId} className={styles.item}>
            <div className={styles.title}>
                <h3>{this.props.item.name}</h3>
                {this.props.item.pictureKey &&
                    <img src={`${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg`} alt="menu item"/>
                }
            </div>
            <div className={styles.description}>
                <p>{this.props.item.description}</p>
            </div>
            <div className={styles.description}>
                {this.renderOptions('Required', optionDefinitions.required)}
            </div>
            <div className={styles.description}>
                {this.renderOptions('Optional', optionDefinitions.optional)}
            </div>
            <div className={styles.price}>
                <p>{this.props.item.price}</p>
                {this.props.delMenu === String(this.props.item.menuId) ? 
                    <div className={styles.admindel}>
                        <p>Are you sure you want to delete this item?</p>
                        <div className={styles.edit}>
                            <button id="" onClick={this.props.handleDelMenu}>Cancel</button>
                        </div>
                        <div className={styles.del}>
                            <button id={this.props.item.menuId} onClick={this.props.handleMenuItemDelete}>Yes, Delete</button>
                        </div>
                    </div>
                    :
                    <div className={styles.admin}>
                        <div className={styles.edit}>
                            <button id={this.props.item.menuId} onClick={() => { this.props.handleMenuItemEdit(this.props.idx) }}>Edit</button>
                        </div>
                        <div className={styles.del}>
                            <button id={this.props.item.menuId} onClick={this.props.handleDelMenu}>Delete</button>
                        </div>
                    </div>
                }
            </div>
        </section>
    }    
}

export default MenuItemView;