import React, { Component } from 'react';
import styles from './MenuItems.module.css';
import { Redirect } from 'react-router-dom';

function renderOptions(title, optionGroups) {
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

class MenuItem extends Component {  
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
                    <img src={`https://homecookimages.blob.core.windows.net/pictures/${this.props.item.pictureKey}.jpg`} alt="menu item"/>
                }
            </div>
            <div className={styles.description}>
                <p>{this.props.item.description}</p>
            </div>
            <div className={styles.description}>
                {renderOptions('Required', optionDefinitions.required)}
            </div>
            <div className={styles.description}>
                {renderOptions('Optional', optionDefinitions.optional)}
            </div>
            <div className={styles.price}>
                <p>{this.props.item.price}</p>
                <div className={styles.admin}>
                    <div className={styles.edit}>
                        <button id={this.props.item.menuId} onClick={() => { this.props.handleMenuItemEdit(this.props.idx) }}>Edit</button>
                    </div>
                    <div className={styles.del}>
                        <button id={this.props.item.menuId} onClick={this.props.handleMenuItemDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </section>
    }    
}

function renderEditOptions(title, optionGroups, handleChange) {
    return optionGroups?.map((optionGroup, idx) => {
        return <div key={idx}>
            <div key={`${idx}`} className={styles.optionGroupTitle}>
                <select value={title} onChange={(e) => {handleChange('title', e.target.value, idx)}}>
                    <option value='optional'>optional</option>
                    <option value='required'>required</option>
                </select>
                <select vaule={optionGroup.option_type} onChange={(e) => {handleChange('option_type', e.target.value, idx)}}>
                    <option value='radio'>radio</option>
                    <option value='checkbox'>checkbox</option>
                </select>
                <input
                    type='text'
                    onChange={(e) => { handleChange('name', e.target.value, idx) }}
                    value={optionGroup.name}/>
                <button onClick={() => { handleChange('backward', null, idx) }}>▲</button>
                <button onClick={() => { handleChange('forward', null, idx) }}>▼</button>
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
                        {optionGroup.options.map((option, idx2) => {
                            return <tr key={idx2}>
                                <td>
                                    <input
                                        type='text'
                                        onChange={(e) => { handleChange('name', e.target.value, idx, idx2) }}
                                        value={option.name}/>
                                </td>
                                <td>
                                    <input
                                        type='text'
                                        onChange={(e) => { handleChange('price', e.target.value, idx, idx2) }}
                                        value={`${option.price || ''}`}/>
                                </td>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={option.default || false}
                                        onChange={(e) => { handleChange('default', e.target.checked, idx, idx2) }}
                                    />
                                </td>
                                <td>                                    
                                    <input
                                        type='checkbox'
                                        //checked={option.availability ||false}
                                        checked={(option.availability !== undefined) ? !option.availability : false}
                                        onChange={(e) => { handleChange('availability', !e.target.checked, idx, idx2) }}
                                    />
                                </td>
                            </tr>                                                                
                        })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    })
}

class MenuItemEdit extends Component {
  
    state = this.getInitialState();
    
    getInitialState() {
      return {
        name: this.props.item.name,
        description: this.props.item.description || '',
        price: this.props.item.price,
        optionDefinitions: this.parseOptionDefinition(),
        image: (this.props.item.pictureKey) ? `https://homecookimages.blob.core.windows.net/pictures/${this.props.item.pictureKey}.jpg` : null,
      };
    }

    parseOptionDefinition() {
        if (this.props.item.optionDefinitions) {
            try {
                return JSON.parse(this.props.item.optionDefinitions)
            }
            catch {}
        }
        return {}
    }

    handleImageChange = (e) => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var file = e.target.files[0]
            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onloadend = (e) => {
                var image = new Image();
                image.onload = () => {
                    var canvas = document.createElement("canvas");
                    var MAX_WIDTH = 300;
                    var MAX_HEIGHT = 300;
                    canvas.width = MAX_WIDTH;
                    canvas.height = MAX_HEIGHT;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT);

                    let imageURL = canvas.toDataURL(file.type)
                    this.setState({
                        image: imageURL
                    })
                }
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }

    render() {
        return <section id={this.props.item.menuId} key={this.props.item.menuId} className={styles.item}>
            <div className={styles.title}>
                <input
                    type='text'
                    onChange={(e) => { this.setState({name: e.target.value}) }}
                    value={this.state.name}/>
                <div>
                    {this.state.image &&
                        <img src={this.state.image} alt="menu item"/>
                    }
                    <input 
                        id="image" 
                        name="image" 
                        type="file" 
                        accept="image/*"
                        width="50"
                        height="50"
                        onChange={this.handleImageChange}
                    />
                </div>
            </div>
            <div className={styles.description}>
                <input
                    type='text'
                    onChange={(e) => { this.setState({description: e.target.value}) }}
                    value={this.state.description}/>
            </div>
            <div className={styles.optionTitle}>
                <p>Required Options</p>
            </div>
            <div className={styles.description}>
                {renderEditOptions('required', this.state.optionDefinitions.required, (key, value, idx, idx2) => {
                    if (idx2) {
                        let obj = this.state.optionDefinitions.required[idx].options[idx2]
                        obj[key] = value
                    }
                    else {
                        if (key === 'title') {
                            let obj = this.state.optionDefinitions.required[idx]
                            this.state.optionDefinitions.required.splice(idx, 1)
                            this.state.optionDefinitions.optional.push(obj)
                        }
                        else if (key === 'forward' && idx < this.state.optionDefinitions.required.length - 1) {
                            let tmp = this.state.optionDefinitions.required[idx]
                            this.state.optionDefinitions.required[idx] = this.state.optionDefinitions.required[idx + 1]
                            this.state.optionDefinitions.required[idx + 1] = tmp
                        }
                        else if (key === 'backward' && idx > 0) {
                            let tmp = this.state.optionDefinitions.required[idx]
                            this.state.optionDefinitions.required[idx] = this.state.optionDefinitions.required[idx - 1]
                            this.state.optionDefinitions.required[idx - 1] = tmp
                        }
                        else {
                            let obj = this.state.optionDefinitions.required[idx]
                            obj[key] = value
                        }
                    }
                    this.setState({
                        optionDefinitions: this.state.optionDefinitions
                    })
                })}
            </div>
            <div className={styles.optionTitle}>
                <p>Optional Options</p>
            </div>
            <div className={styles.description}>
                {renderEditOptions('optional', this.state.optionDefinitions.optional, (key, value, idx, idx2) => {
                    if (idx2) {
                        let obj = this.state.optionDefinitions.optional[idx].options[idx2]
                        obj[key] = value
                    }
                    else {
                        console.log(key, idx)
                        if (key === 'title') {
                            let obj = this.state.optionDefinitions.optional[idx]
                            this.state.optionDefinitions.optional.splice(idx, 1)
                            this.state.optionDefinitions.required.push(obj)
                        }
                        else if (key === 'forward' && idx < this.state.optionDefinitions.optional.length - 1) {
                            let tmp = this.state.optionDefinitions.optional[idx]
                            this.state.optionDefinitions.optional[idx] = this.state.optionDefinitions.optional[idx + 1]
                            this.state.optionDefinitions.optional[idx + 1] = tmp
                        }
                        else if (key === 'backward' && idx > 0) {
                            let tmp = this.state.optionDefinitions.optional[idx]
                            this.state.optionDefinitions.optional[idx] = this.state.optionDefinitions.optional[idx - 1]
                            this.state.optionDefinitions.optional[idx - 1] = tmp
                        }
                        else {
                            let obj = this.state.optionDefinitions.optional[idx]
                            obj[key] = value
                        }
                    }
                    this.setState({
                        optionDefinitions: this.state.optionDefinitions
                    })
                })}
            </div>
            <div className={styles.price}>
                <input
                    type='text'
                    onChange={(e) => { this.setState({price: e.target.value}) }}
                    value={this.state.price}/>
                <div className={styles.admin}>
                    <div className={styles.edit}>
                        <button id={this.props.item.menuId} onClick={() => { this.props.handleMenuItemUpdate(this.props.idx, this.state) }}>Update</button>
                    </div>
                    {/*
                    <div className={styles.del}>
                        <button id={this.props.item.menuId} onClick={this.props.handleMenuItemCancel}>Cancel</button>
                    </div>
                    */}
                </div>
            </div>
        </section>
    }
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