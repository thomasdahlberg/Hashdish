import React from 'react';
import EditItemOption from '../EditItemOption/EditItemOption';
import styles from './EditItemOptionCategory.module.css';

const EditItemOptionCategory = (props) => {
  return (
    <div className={styles.options}>
      <div className={styles.title}>
        <h3>{props.headerText}</h3>
        <button
          id={props.optionCategory}
          name="addOptCat"
          onClick={props.handleOptionChange}
        >
          Add Option Category
        </button>
      </div>
      <div className={styles.optrender}>
        {props.optionsGroups?.map((optionGroup, optionGroupIdx) => (
          <div className={styles.container} key={optionGroupIdx}>
            <div
              key={`${optionGroupIdx}`}
              id={optionGroupIdx}
              name={props.optionCategory}
              className={styles.category}
              title={props.optionCategory}
            >
              <div
                className={styles.field}
                key={`${optionGroupIdx}`}
                id={optionGroupIdx}
                name={props.optionCategory}
                title={props.optionCategory}
              >
                <label>Category Name</label>
                <input
                  id="name"
                  name="editOptCat"
                  type="text"
                  value={optionGroup.name}
                  onChange={props.handleOptionChange}
                />
              </div>
              <div
                className={styles.field}
                key={`${optionGroupIdx}`}
                id={optionGroupIdx}
                name={props.optionCategory}
                title={props.optionCategory}
              >
                <label>Option Type</label>
                <select
                  id="option_type"
                  name="editOptCat"
                  value={optionGroup.option_type}
                  onChange={props.handleOptionChange}
                >
                  <option value="radio">radio</option>
                  <option value="checkbox">checkbox</option>
                </select>
              </div>
              <button
                className={styles.arrow}
                name="moveOptCatBackward"
                onClick={props.handleOptionChange}
              >
                ▲
              </button>
              <button
                className={styles.arrow}
                name="moveOptCatForward"
                onClick={props.handleOptionChange}
              >
                ▼
              </button>
              <button
                className={styles.delete}
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
