import React from 'react';

const EditItemOption = (props) => {
  return (
    <div
      key={props.optionIdx}
      title={props.optionCategory}
      id={props.optionGroupIdx}
    >
      <input
        id={props.optionIdx}
        title="name"
        name="editOption"
        type="text"
        value={props.option.name}
        onChange={props.handleOptionChange}
      />
      <input
        id={props.optionIdx}
        title="price"
        name="editOption"
        type="text"
        value={`${props.option.price || ''}`}
        onChange={props.handleOptionChange}
      />
      <input
        id={props.optionIdx}
        title="default"
        name="editOption"
        type="checkbox"
        checked={props.option.default || false}
        onChange={props.handleOptionChange}
      />
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
      <div title={props.optionCategory} id={props.optionGroupIdx}>
        <button
          name="deleteOption"
          id={props.optionIdx}
          onClick={props.handleOptionChange}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditItemOption;
