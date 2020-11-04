import React, { Component } from 'react';
import styles from './MenuItemEdit.module.css';

const STORAGE_URL = process.env.NODE_ENV === 'production' ?
    'https://hashdish.blob.core.windows.net/'
    :
    'https://homecookimages.blob.core.windows.net/';

class MenuItemEdit extends Component {
  
    state = this.getInitialState();
    
    getInitialState() {
      return {
        name: this.props.item.name,
        description: this.props.item.description || '',
        price: this.props.item.price,
        optionDefinitions: this.parseOptionDefinition(),
        image: (this.props.item.pictureKey) ? `${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg` : null,
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
            if (e.target.files.length > 0) {
                var file = e.target.files[0]
                var reader = new FileReader();
                // Set the image once loaded into file reader
                reader.onloadend = (e) => {
                    var image = new Image();
                    image.onload = () => {
                        var canvas = document.createElement("canvas");
                        var MAX_WIDTH;
                        var MAX_HEIGHT;
                        var ratio = image.width / image.height
                        if (1 > ratio) {
                            MAX_WIDTH = 500
                            MAX_HEIGHT = 500 / ratio
                        }
                        else {
                            MAX_WIDTH = 500 * ratio
                            MAX_HEIGHT = 500
                        }
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
            }
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }

    handleChange(current) {
        return (key, value, idx, idx2) => {
            if (idx2 >= 0) {
                if (key === 'delete') {
                    current[idx].options.splice(idx2, 1)
                }
                else {
                    let obj = current[idx].options[idx2]
                    obj[key] = value
                }
            }
            else {
                if (key === 'title') {
                    let obj = current[idx]
                    current.splice(idx, 1)
                    this.state.optionDefinitions[value].push(obj)
                }
                else if (key === 'forward' && idx < current.length - 1) {
                    let tmp = current[idx]
                    current[idx] = current[idx + 1]
                    current[idx + 1] = tmp
                }
                else if (key === 'backward' && idx > 0) {
                    let tmp = current[idx]
                    current[idx] = current[idx - 1]
                    current[idx - 1] = tmp
                }
                else if (key === 'delete') {
                    current.splice(idx, 1)
                }
                else if (key === 'add') {
                    current[idx].options.push({
                        name: ''
                    })
                }
                else {
                    let obj = current[idx]
                    obj[key] = value
                }
            }
            this.setState({
                optionDefinitions: this.state.optionDefinitions
            })
        }
    }

    renderEditOptions(title, optionGroups, handleChange) {
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
                    <button onClick={() => { handleChange('delete', null, idx) }}>Delete</button>
                    <button onClick={() => { handleChange('add', null, idx) }}>Add Option</button>
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
                                    <td>
                                        <button onClick={() => { handleChange('delete', null, idx, idx2) }}>Delete</button>
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

    componentWillUnmount = () => {
        this.props.handleMenuItemCancel(null);
    }

    render() {
        return (
            <section id={this.props.item.menuId} key={this.props.item.menuId} className={styles.item}>
                <h2>Update Item</h2>
                <div className={styles.title}>
                    <div>
                        <label>Item Name</label>
                        <input
                            type='text'
                            onChange={(e) => { this.setState({name: e.target.value}) }}
                            value={this.state.name}
                        />
                    </div>
                    <div>
                        <label>Item Image</label>
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
                    <label>Item Description</label>
                    <textarea
                        type='text'
                        rows={3}
                        onChange={(e) => { this.setState({description: e.target.value}) }}
                        value={this.state.description}/>
                </div>
                <div className={styles.options}>
                    <div className={styles.optionTitle}>
                        <p>Required Options</p>
                        <button onClick={() => {
                            this.state.optionDefinitions.required.unshift({
                                name: '',
                                option_type: 'checkbox',
                                options: []
                            })
                            this.setState({
                                optionDefinitions: this.state.optionDefinitions
                            })
                        }}>+</button>
                    </div>
                    <div className={styles.optrender}>
                        {this.renderEditOptions('required', this.state.optionDefinitions.required, this.handleChange(this.state.optionDefinitions.required))}
                    </div>
                    <div className={styles.optionTitle}>
                        <p>Optional Options</p>
                        <button onClick={() => {
                            this.state.optionDefinitions.optional.unshift({
                                name: '',
                                option_type: 'checkbox',
                                options: []
                            })
                            this.setState({
                                optionDefinitions: this.state.optionDefinitions
                            })
                        }}>+</button>
                    </div>
                    <div className={styles.optrender}>
                        {this.renderEditOptions('optional', this.state.optionDefinitions.optional, this.handleChange(this.state.optionDefinitions.optional))}
                    </div>
                </div>
                <div className={styles.price}>
                    <label>Item Price</label>
                    <input
                        type='text'
                        onChange={(e) => { this.setState({price: e.target.value}) }}
                        value={this.state.price}/>
                </div>
                <div className={styles.admin}>
                        <div className={styles.edit}>
                            <button id={this.props.item.menuId} onClick={() => { this.props.handleMenuItemUpdate(this.props.idx, this.state) }}>Update</button>
                        </div>
                        <div className={styles.del}>
                            <button id={this.props.item.menuId} onClick={this.props.handleMenuItemCancel}>Cancel</button>
                        </div>   
                </div>
            </section>
        )
    }
}

export default MenuItemEdit;