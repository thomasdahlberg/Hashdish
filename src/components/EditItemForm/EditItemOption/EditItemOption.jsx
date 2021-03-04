import React from 'react';
import styles from './EditItemOption.module.css';

const EditItemOption = (props) => {
  return (
    <tr className={styles.container} key={props.optionIdx}>
      <td>
        <input
          data-opt-type={props.optionType}
          data-category-idx={props.optCatIdx}
          data-opt-idx={props.optionIdx}
          data-prop-name="name"
          name="editOption"
          type="text"
          value={props.option.name}
          onChange={props.handleOptionChange}
        />
      </td>
      <td>
        <input
          data-opt-type={props.optionType}
          data-category-idx={props.optCatIdx}
          data-opt-idx={props.optionIdx}
          data-prop-name="price"
          name="editOption"
          type="text"
          value={`${props.option.price || ''}`}
          onChange={props.handleOptionChange}
        />
      </td>
      <td>
        <input
          data-opt-type={props.optionType}
          data-category-idx={props.optCatIdx}
          data-opt-idx={props.optionIdx}
          data-prop-name="default"
          name="editOption"
          type="checkbox"
          checked={props.option.default}
          onChange={props.handleOptionChange}
        />
      </td>
      <td>
        <input
          data-opt-type={props.optionType}
          data-category-idx={props.optCatIdx}
          data-opt-idx={props.optionIdx}
          data-prop-name="availability"
          name="editOption"
          type="checkbox"
          checked={
            props.option.availability !== undefined
              ? props.option.availability
              : false
          }
          onChange={props.handleOptionChange}
        />
      </td>
      <td className={styles.delete}>
        <button
          data-opt-type={props.optionType}
          data-category-idx={props.optCatIdx}
          data-opt-idx={props.optionIdx}
          name="deleteOption"
          onClick={props.handleOptionChange}
        >
          -
        </button>
      </td>
    </tr>
  );
};

export default EditItemOption;
