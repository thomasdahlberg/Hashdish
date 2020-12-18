import React, { Component } from 'react';
import AdminButtons from '../AdminButtons/AdminButtons';
import EditItemDescription from '../EditItemDescription/EditItemDescription';
import EditItemOptions from '../EditItemOptions/EditItemOptions';
import styles from './EditMenuItem.module.css';

const STORAGE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hashdish.blob.core.windows.net/'
    : 'https://homecookimages.blob.core.windows.net/';

class EditMenuItem extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      name: this.props.item.name,
      description: this.props.item.description || '',
      price: this.props.item.price,
      optionalOptions: this.props.itemOptionalOptionDefs,
      requiredOptions: this.props.itemRequiredOptionDefs,
      image: this.props.item.pictureKey
        ? `${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg`
        : null,
    };
  }

  handleDescriptionChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    if (
      window.File &&
      window.FileReader &&
      window.FileList &&
      window.Blob
    ) {
      if (e.target.files.length > 0) {
        let file = e.target.files[0];
        let reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onloadend = (e) => {
          let image = new Image();
          image.onload = () => {
            let canvas = document.createElement('canvas');
            let MAX_WIDTH;
            let MAX_HEIGHT;
            let ratio = image.width / image.height;
            if (1 > ratio) {
              MAX_WIDTH = 500;
              MAX_HEIGHT = 500 / ratio;
            } else {
              MAX_WIDTH = 500 * ratio;
              MAX_HEIGHT = 500;
            }
            canvas.width = MAX_WIDTH;
            canvas.height = MAX_HEIGHT;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT);
            let imageURL = canvas.toDataURL(file.type);
            this.setState({
              image: imageURL,
            });
          };
          image.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  };

  updateOptionsState = (change) => {
    return change;
  };

  handleOptionChange = (e) => {
    switch (e.target.name) {
      case 'title':
        console.log('Title!');
        this.changeOptionTitle(e.target);
        break;
      case 'forward':
        console.log('Forward!');
        this.moveOptCatForward(e.target);
        break;
      case 'backward':
        console.log('Backward!');
        this.moveOptCatBackward(e.target);
        break;
      case 'deleteOptCat':
        this.deleteOptionCategory(e.target);
        break;
      case 'addOption':
        console.log('Add!');
        this.addOption(e.target);
        break;
      default:
        console.log(`Option Change Error: ${e.target}`);
        break;
    }
  };

  addOptionCategory = (event) => {
    const optionCategory = event.target.id;
    const newCategory = {
      name: '',
      option_type: 'checkbox',
      options: [],
    };

    if (optionCategory === 'requiredOptions') {
      this.setState({
        requiredOptions: [newCategory, ...this.state.requiredOptions],
      });
    } else {
      this.setState({
        optionalOptions: [newCategory, ...this.state.optionalOptions],
      });
    }
  };

  deleteOptionCategory = ({ parentNode: { id, title } }) => {
    if (title === 'requiredOptions') {
      this.setState({
        requiredOptions: this.state.requiredOptions.filter(
          (item, idx) => idx !== Number(id),
        ),
      });
    } else {
      this.setState({
        optionalOptions: this.state.optionalOptions.filter(
          (item, idx) => idx !== Number(id),
        ),
      });
    }
  };

  addOption = (optionObj) => {
    // optionObj[idx].options.push({
    //     name: ''
    // })
  };

  moveOptCatForward = ({ parentNode: { id, title } }) => {
    const idx = Number(id);
    let newArray =
      title === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    let tempStorage = newArray[idx];
    newArray[idx] = newArray[idx + 1];
    newArray[idx + 1] = tempStorage;

    title === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  moveOptCatBackward = ({ parentNode: { id, title } }) => {
    const idx = Number(id);
    let newArray =
      title === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    let tempStorage = newArray[idx];
    newArray[idx] = newArray[idx - 1];
    newArray[idx - 1] = tempStorage;

    title === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  changeOptionTitle = (optionObj) => {
    // let obj = optionObj[idx]
    // optionObj.splice(idx, 1)
    // this.state.optionDefinitions[value].push(obj)
  };

  componentWillUnmount = () => {
    this.props.handleMenuItemCancel(null);
  };

  render() {
    return (
      <section
        id={this.props.item.menuId}
        key={this.props.item.menuId}
        className={styles.item}
      >
        <h2>Update Item</h2>
        <EditItemDescription
          itemName={this.state.name}
          itemImage={this.state.image}
          itemDescription={this.state.description}
          itemPrice={this.state.price}
          handleChange={this.handleDescriptionChange}
          handleImageChange={this.handleImageChange}
        />
        <EditItemOptions
          headerText="Required Selections"
          optionCategory="requiredOptions"
          optionsGroups={this.state.requiredOptions}
          handleOptionChange={this.handleOptionChange}
          addOptionCategory={this.addOptionCategory}
        />
        <EditItemOptions
          headerText="Add-on Options"
          optionCategory="optionalOptions"
          optionsGroups={this.state.optionalOptions}
          handleOptionChange={this.handleOptionChange}
          addOptionCategory={this.addOptionCategory}
        />
        <AdminButtons
          submitId={this.props.item.menuId}
          submitTitle="Update"
          cancelId={this.props.item.menuId}
          cancelTitle="Cancel"
          // submitFunction={this.props.handleMenuItemUpdate(props.idx, state)}
          cancelFunction={this.props.handleMenuItemCancel}
        />
      </section>
    );
  }
}

export default EditMenuItem;
