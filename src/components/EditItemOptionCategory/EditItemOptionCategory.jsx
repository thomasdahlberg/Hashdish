import React from 'react';
import EditItemOption from '../EditItemOption/EditItemOption';
import styles from './EditItemOptionCategory.module.css';

const EditItemOptionCategory = (props) => {
  return (
    <div className={styles.options}>
      <div className={styles.title}>
        <h3>{props.headerText}</h3>
        <button
          data-opt-type={props.optionType}
          name="addOptCat"
          onClick={props.handleOptionChange}
        >
          Add Option Category
        </button>
      </div>
      <div className={styles.optrender}>
        {props.optionsCategories.map((optionCategory, optCatIdx) => (
          <div className={styles.container} key={optCatIdx}>
            <div className={styles.category}>
              <div className={styles.field}>
                <label>Category Name</label>
                <input
                  data-prop-name="name"
                  data-category-idx={optCatIdx}
                  data-opt-type={props.optionType}
                  name="editOptCat"
                  type="text"
                  value={optionCategory.name}
                  onChange={props.handleOptionChange}
                />
              </div>
              <div className={styles.field}>
                <label>Option Type</label>
                <select
                  data-prop-name="option_type"
                  data-category-idx={optCatIdx}
                  data-opt-type={props.optionType}
                  name="editOptCat"
                  value={optionCategory.option_type}
                  onChange={props.handleOptionChange}
                >
                  <option value="radio">radio</option>
                  <option value="checkbox">checkbox</option>
                </select>
              </div>
              <button
                data-category-idx={optCatIdx}
                data-opt-type={props.optionType}
                className={styles.arrow}
                name="moveOptCatBackward"
                onClick={props.handleOptionChange}
              >
                ▲
              </button>
              <button
                data-category-idx={optCatIdx}
                data-opt-type={props.optionType}
                className={styles.arrow}
                name="moveOptCatForward"
                onClick={props.handleOptionChange}
              >
                ▼
              </button>
              <button
                data-category-idx={optCatIdx}
                data-opt-type={props.optionType}
                className={styles.delete}
                name="deleteOptCat"
                onClick={props.handleOptionChange}
              >
                Delete Category
              </button>
              <button
                data-category-idx={optCatIdx}
                data-opt-type={props.optionType}
                className={styles.add}
                name="addOption"
                onClick={props.handleOptionChange}
              >
                Add Option
              </button>
            </div>
            {optionCategory.options.length > 0 && (
              <div>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Add-on Price</th>
                      <th>Default</th>
                      <th>Sold Out</th>
                    </tr>
                    {optionCategory.options.map(
                      (option, optionIdx) => (
                        <EditItemOption
                          key={optionIdx}
                          optionType={props.optionType}
                          option={option}
                          optCatIdx={optCatIdx}
                          optionIdx={optionIdx}
                          handleOptionChange={
                            props.handleOptionChange
                          }
                        />
                      ),
                    )}
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