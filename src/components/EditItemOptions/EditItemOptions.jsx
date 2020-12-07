import React, { Fragment } from 'react';
import EditItemOption from '../EditItemOption/EditItemOption';
import styles from './EditItemOptions.module.css';

const EditItemOptions = (props) => {
    return (
        <Fragment>
            { props.optionGroups?.map((optionGroup, optionGroupIdx) => 
                <div key={optionGroupIdx}>
                    <div key={`${optionGroupIdx}`} className={styles.optionGroupTitle}>
                        <select 
                            value={props.title} 
                            onChange={(e) => {
                                props.handleChange('title', e.target.value, optionGroupIdx)
                        }}>
                            <option value='optional'>optional</option>
                            <option value='required'>required</option>
                        </select>
                        <select 
                            value={optionGroup.option_type}
                            onChange={(e) => {
                                props.handleChange('option_type', e.target.value, optionGroupIdx)
                        }}>
                            <option value='radio'>radio</option>
                            <option value='checkbox'>checkbox</option>
                        </select>
                        <input
                            type='text'
                            value={optionGroup.name}
                            onChange={(e) => {
                                props.handleChange('name', e.target.value, optionGroupIdx)    
                        }}/>
                        <button onClick={() => { props.handleChange('backward', null, optionGroupIdx) }}>▲</button>
                        <button onClick={() => { props.handleChange('forward', null, optionGroupIdx) }}>▼</button>
                        <button onClick={() => { props.handleChange('delete', null, optionGroupIdx) }}>Delete</button>
                        <button onClick={() => { props.handleChange('add', null, optionGroupIdx) }}>Add Option</button>
                    </div>
                    { optionGroup.options.length > 0 &&
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Additional Price</th>
                                        <th>Default</th>
                                        <th>Sold Out</th>
                                    </tr>
                                    { optionGroup.options.map((option, optionIdx) => 
                                        <EditItemOption 
                                            option={option}
                                            optionGroupIdx={optionGroupIdx}
                                            optionIdx={optionIdx}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            )}
        </Fragment>
    )
}

export default EditItemOptions;