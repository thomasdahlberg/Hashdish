import React from 'react';
import EditItemOption from '../EditItemOption/EditItemOption';
import styles from './EditItemOptions.module.css';

const EditItemOptionCategory = (props) => {
  return (
    <div className={styles.options}>
      <div className={styles.optionTitle}>
        <p>{props.headerText}</p>
        <button
          id={props.optionCategory}
          name="addOptCat"
          onClick={props.handleOptionChange}
        >
          New Option Category
        </button>
      </div>
      <div className={styles.optrender}>
        {props.optionsGroups?.map((optionGroup, optionGroupIdx) => (
          <div key={optionGroupIdx}>
            <div
              key={`${optionGroupIdx}`}
              id={optionGroupIdx}
              name={props.optionCategory}
              className={styles.optionGroupTitle}
              title={props.optionCategory}
            >
              <select
                id="option_type"
                name="editOptCat"
                value={optionGroup.option_type}
                onChange={props.handleOptionChange}
              >
                <option value="radio">radio</option>
                <option value="checkbox">checkbox</option>
              </select>
              <input
                id="name"
                name="editOptCat"
                type="text"
                value={optionGroup.name}
                onChange={props.handleOptionChange}
              />
              <button
                name="moveOptCatBackward"
                onClick={props.handleOptionChange}
              >
                ▲
              </button>
              <button
                name="moveOptCatForward"
                onClick={props.handleOptionChange}
              >
                ▼
              </button>
              <button
                name="deleteOptCat"
                onClick={props.handleOptionChange}
              >
                Delete
              </button>
              <button
                name="addOption"
                onClick={props.handleOptionChange}
              >
                Add Option
              </button>
            </div>
            {optionGroup.options.length > 0 && (
              <div>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Additional Price</th>
                      <th>Default</th>
                      <th>Sold Out</th>
                    </tr>
                    {optionGroup.options.map((option, optionIdx) => (
                      <EditItemOption
                        optionCategory={props.optionCategory}
                        option={option}
                        optionGroupIdx={optionGroupIdx}
                        optionIdx={optionIdx}
                        handleOptionChange={props.handleOptionChange}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditItemOptionCategory;
