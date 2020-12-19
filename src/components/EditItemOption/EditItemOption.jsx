import React from 'react';
import styles from './EditItemOption.module.css';

const EditItemOption = (props) => {
  return (
    <tr
      className={styles.container}
      key={props.optionIdx}
      title={props.optionCategory}
      id={props.optionGroupIdx}
    >
      <td>
        <input
          id={props.optionIdx}
          title="name"
          name="editOption"
          type="text"
          value={props.option.name}
          onChange={props.handleOptionChange}
        />
      </td>
      <td>
        <input
          id={props.optionIdx}
          title="price"
          name="editOption"
          type="text"
          value={`${props.option.price || ''}`}
          onChange={props.handleOptionChange}
        />
      </td>
      <td>
        <input
          id={props.optionIdx}
          title="default"
          name="editOption"
          type="checkbox"
          checked={props.option.default || false}
          onChange={props.handleOptionChange}
        />
      </td>
      <td>
        <input
          id={props.optionIdx}
          title="availability"
          name="editOption"
          type="checkbox"
          checked={
            props.option.availability !== undefined
              ? !props.option.availability
              : false
          }
          onChange={props.handleOptionChange}
        />
      </td>
      <td
        className={styles.delete}
        title={props.optionCategory}
        id={props.optionGroupIdx}
      >
        <button
          name="deleteOption"
          id={props.optionIdx}
          onClick={props.handleOptionChange}
        >
          -
        </button>
      </td>
    </tr>
  );
};

export default EditItemOption;
