import React, { Component } from 'react';
import AdminButtons from '../AdminButtons/AdminButtons';
import EditItemDescription from '../EditItemDescription/EditItemDescription';
import EditItemOptionCategory from '../EditItemOptionCategory/EditItemOptionCategory';
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

  handleOptionChange = (e) => {
    switch (e.target.name) {
      case 'title':
        console.log('Title!');
        this.changeOptionTitle(e.target);
        break;
      case 'moveOptCatForward':
        this.moveOptCatForward(e.target);
        break;
      case 'moveOptCatBackward':
        this.moveOptCatBackward(e.target);
        break;
      case 'addOptCat':
        this.addOptCat(e.target);
        break;
      case 'deleteOptCat':
        this.deleteOptCat(e.target);
        break;
      case 'editOptCat':
        console.log('editOptCat');
        this.editOptCat(e.target);
        break;
      case 'addOption':
        this.addOption(e.target);
        break;
      case 'deleteOption':
        this.deleteOption(e.target);
        break;
      case 'editOption':
        this.editOption(e.target);
        break;
      default:
        console.log(`Option Change Error: ${e.target}`);
        break;
    }
  };

  moveOptCatForward = ({ parentNode: { id, title: optionType } }) => {
    const idx = Number(id);
    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    let tempStorage = newArray[idx];
    newArray[idx] = newArray[idx + 1];
    newArray[idx + 1] = tempStorage;

    optionType === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  moveOptCatBackward = ({
    parentNode: { id, title: optionType },
  }) => {
    const idx = Number(id);
    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    let tempStorage = newArray[idx];
    newArray[idx] = newArray[idx - 1];
    newArray[idx - 1] = tempStorage;

    optionType === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  addOptCat = ({ id: optionType }) => {
    const newCategory = {
      name: '',
      option_type: 'checkbox',
      options: [],
    };

    optionType === 'requiredOptions'
      ? this.setState({
          requiredOptions: [
            newCategory,
            ...this.state.requiredOptions,
          ],
        })
      : this.setState({
          optionalOptions: [
            newCategory,
            ...this.state.optionalOptions,
          ],
        });
  };

  deleteOptCat = ({
    parentNode: { id: optCatIdx, title: optionType },
  }) => {
    if (optionType === 'requiredOptions') {
      this.setState({
        requiredOptions: this.state.requiredOptions.filter(
          (item, idx) => idx !== Number(optCatIdx),
        ),
      });
    } else {
      this.setState({
        optionalOptions: this.state.optionalOptions.filter(
          (item, idx) => idx !== Number(optCatIdx),
        ),
      });
    }
  };

  editOptCat = ({
    id: optCatKey,
    value,
    parentNode: { id: optCatIdx, title: optionType },
  }) => {
    let newCatObj =
      optionType === 'requiredOptions'
        ? {
            ...this.state.requiredOptions[Number(optCatIdx)],
          }
        : {
            ...this.state.optionalOptions[Number(optCatIdx)],
          };

    optCatKey === 'name'
      ? (newCatObj.name = value)
      : (newCatObj.option_type = value);

    if (optionType === 'requiredOptions') {
      this.setState({
        requiredOptions: this.state.requiredOptions.map((item, idx) =>
          idx === Number(optCatIdx) ? newCatObj : item,
        ),
      });
    } else {
      this.setState({
        optionalOptions: this.state.optionalOptions.map((item, idx) =>
          idx === Number(optCatIdx) ? newCatObj : item,
        ),
      });
    }
  };

  addOption = ({ parentNode: { id: idx, title: optionType } }) => {
    const grpIdx = Number(idx);
    const newOption = {
      default: false,
      name: '',
      price: 0,
    };

    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];
    newArray[grpIdx].options.push(newOption);

    optionType === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  deleteOption = ({
    id: idx,
    parentNode: { id: idx2, title: optionCategory },
  }) => {
    const optIdx = Number(idx);
    const grpIdx = Number(idx2);

    let newArray =
      optionCategory === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    newArray[grpIdx].options.splice(optIdx, 1);

    optionCategory === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  editOption = ({ id: optionKey, value }) => {
    return;
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
        <EditItemOptionCategory
          headerText="Required Selections"
          optionCategory="requiredOptions"
          optionsGroups={this.state.requiredOptions}
          handleOptionChange={this.handleOptionChange}
        />
        <EditItemOptionCategory
          headerText="Add-on Options"
          optionCategory="optionalOptions"
          optionsGroups={this.state.optionalOptions}
          handleOptionChange={this.handleOptionChange}
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
