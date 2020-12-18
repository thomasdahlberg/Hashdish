import React from 'react';

const EditItemOption = (props) => {
  return (
    <tr key={props.optionIdx}>
      <td>
        <input
          type="text"
          value={props.option.name}
          onChange={(e) => {
            props.handleChange(
              'name',
              e.target.value,
              props.optionGroupIdx,
              props.optionIdx,
            );
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={`${props.option.price || ''}`}
          onChange={(e) => {
            props.handleChange(
              'price',
              e.target.value,
              props.optionGroupIdx,
              props.optionIdx,
            );
          }}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={props.option.default || false}
          onChange={(e) => {
            props.handleChange(
              'default',
              e.target.checked,
              props.optionGroupIdx,
              props.optionIdx,
            );
          }}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={
            props.option.availability !== undefined
              ? !props.option.availability
              : false
          }
          onChange={(e) => {
            props.handleChange(
              'availability',
              !e.target.checked,
              props.optionGroupIdx,
              props.optionIdx,
            );
          }}
        />
      </td>
      <td title={props.optionCategory} id={props.optionGroupIdx}>
        <button
          name="deleteOption"
          id={props.optionIdx}
          onClick={props.handleOptionChange}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EditItemOption;
