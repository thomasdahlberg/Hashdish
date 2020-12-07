import React, { Fragment } from 'react';
import styles from './ViewItemOptions.module.css';

const ViewItemOptions = (props) => {
    return (
        <Fragment>
            { props.optionGroups?.map((optionGroup, optionGroupidx) => 
                <div key={optionGroupidx}>
                    <div key={`${optionGroupidx}`} className={styles.optionGroupTitle}>
                        <p>[{props.title}] {optionGroup.name} ({optionGroup.option_type})</p>
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
                                {optionGroup.options.map((option, idx) => 
                                    <tr key={idx}>
                                        <td key={`${idx}name`}>{option.name}</td>
                                        <td key={`${idx}price`}>${option.price}</td>
                                        <td key={`${idx}default`}><input type='checkbox' defaultChecked={option.default}/></td>
                                        <td key={`${idx}availability`}><input type='checkbox' defaultChecked={option.availability}/></td>
                                    </tr>                                                                
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

export default ViewItemOptions