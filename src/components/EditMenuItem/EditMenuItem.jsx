import React, { Component } from 'react';
import AdminButtons from '../AdminButtons/AdminButtons';
import EditItemDescription from '../EditItemDescription/EditItemDescription';
import EditItemOptionCategory from '../EditItemOptionCategory/EditItemOptionCategory';
import styles from './EditMenuItem.module.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { axiosApiInstance as API } from '../../utils/axiosConfig';

var STORAGE_URL = 'https://lycheestroage0001.blob.core.windows.net/';
if (process.env.NODE_ENV === 'production') {
  STORAGE_URL = 'https://lycheestorage9999.blob.core.windows.net/';
}

class EditMenuItem extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      name: this.props.item.name,
      description: this.props.item.description || '',
      price: this.props.item.price,
      optionalOptions: this.props.itemOptionalOptionDefs
        ? this.props.itemOptionalOptionDefs
        : [],
      requiredOptions: this.props.itemRequiredOptionDefs
        ? this.props.itemRequiredOptionDefs
        : [],
      image: this.props.item.pictureKey
        ? `${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg`
        : null,
      open: true,
    };
  }

  handleCheckbox = (e) => {};

  handleMenuItemUpdate = async () => {
    const item = { ...this.props.item };
    const optionDefs = {
      required: this.state.requiredOptions,
      optional: this.state.optionalOptions,
    };
    const stringifiedOptionDefs = JSON.stringify(optionDefs);

    await API.patch(
      `/kitchen/menu/${item.menuId}`,
      Object.assign(item, {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        optionDefinitions: stringifiedOptionDefs,
      }),
    )
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response);
          if (
            this.state.image &&
            this.state.image.startsWith('data:image/jpeg;base64')
          ) {
            await API.patch(`/kitchen/menu/picture/${item.menuId}`, {
              data: this.state.image.split(',')[1],
            }).then((response) => {
              if (response.status === 200) {
                console.log(response);
              }
            });
          }
        }
      })
      .then(async (response) => {
        this.props.handleMenuItemCancel();
        this.props.handleGetKitchen();
      });
  };

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

  moveOptCatForward = (target) => {
    const optCatIdx = Number(
      target.getAttribute('data-category-idx'),
    );
    const optionType = target.getAttribute('data-opt-type');

    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    if (optCatIdx < newArray.length - 1) {
      let tempStorage = newArray[optCatIdx];
      newArray[optCatIdx] = newArray[optCatIdx + 1];
      newArray[optCatIdx + 1] = tempStorage;

      optionType === 'requiredOptions'
        ? this.setState({ requiredOptions: newArray })
        : this.setState({ optionalOptions: newArray });
    } else {
      return;
    }
  };

  moveOptCatBackward = (target) => {
    const optCatIdx = Number(
      target.getAttribute('data-category-idx'),
    );
    const optionType = target.getAttribute('data-opt-type');

    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    if (optCatIdx > 0) {
      let tempStorage = newArray[optCatIdx];
      newArray[optCatIdx] = newArray[optCatIdx - 1];
      newArray[optCatIdx - 1] = tempStorage;

      optionType === 'requiredOptions'
        ? this.setState({ requiredOptions: newArray })
        : this.setState({ optionalOptions: newArray });
    } else {
      return;
    }
  };

  addOptCat = (target) => {
    const optionType = target.getAttribute('data-opt-type');
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

  deleteOptCat = (target) => {
    const optCatIdx = target.getAttribute('data-category-idx');
    const optionType = target.getAttribute('data-opt-type');

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

  editOptCat = (target) => {
    const optCatKey = target.getAttribute('data-prop-name');
    const optCatIdx = target.getAttribute('data-category-idx');
    const optionType = target.getAttribute('data-opt-type');

    let newCatObj =
      optionType === 'requiredOptions'
        ? {
            ...this.state.requiredOptions[Number(optCatIdx)],
          }
        : {
            ...this.state.optionalOptions[Number(optCatIdx)],
          };

    optCatKey === 'name'
      ? (newCatObj.name = target.value)
      : (newCatObj.option_type = target.value);

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

  addOption = (target) => {
    const optCatIdx = Number(
      target.getAttribute('data-category-idx'),
    );
    const optionType = target.getAttribute('data-opt-type');
    const newOption = {
      default: false,
      name: '',
      price: 0,
    };

    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    newArray[optCatIdx].options.push(newOption);

    optionType === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  deleteOption = (target) => {
    const optCatIdx = Number(
      target.getAttribute('data-category-idx'),
    );
    const optionIdx = Number(target.getAttribute('data-opt-idx'));
    const optionType = target.getAttribute('data-opt-type');

    let newArray =
      optionType === 'requiredOptions'
        ? [...this.state.requiredOptions]
        : [...this.state.optionalOptions];

    newArray[optCatIdx].options.splice(optionIdx, 1);

    optionType === 'requiredOptions'
      ? this.setState({ requiredOptions: newArray })
      : this.setState({ optionalOptions: newArray });
  };

  editOption = (target) => {
    const optionKey = target.getAttribute('data-prop-name');
    const optCatIdx = target.getAttribute('data-category-idx');
    const optionIdx = target.getAttribute('data-opt-idx');
    const optionType = target.getAttribute('data-opt-type');
    const value =
      target.type === 'checkbox' ? target.checked : target.value;

    let newCatObj =
      optionType === 'requiredOptions'
        ? {
            ...this.state.requiredOptions[Number(optCatIdx)],
          }
        : {
            ...this.state.optionalOptions[Number(optCatIdx)],
          };

    newCatObj.options[optionIdx][optionKey] = value;

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

  componentWillUnmount = () => {
    this.props.handleMenuItemCancel();
  };

  render() {
    return (
      <section
        id={this.props.item.menuId}
        key={this.props.item.menuId}
        className={styles.item}
      >
        <Dialog open={this.state.open}>
          <DialogTitle>Update Item</DialogTitle>
          <DialogContent>
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
              optionType="requiredOptions"
              optionsCategories={this.state.requiredOptions}
              handleOptionChange={this.handleOptionChange}
            />
            <EditItemOptionCategory
              headerText="Add-on Options"
              optionType="optionalOptions"
              optionsCategories={this.state.optionalOptions}
              handleOptionChange={this.handleOptionChange}
            />
          </DialogContent>
          <DialogActions>
            <AdminButtons
              submitId={this.props.item.menuId}
              submitTitle="Update"
              cancelId={this.props.item.menuId}
              cancelTitle="Cancel"
              submitFunction={this.handleMenuItemUpdate}
              cancelFunction={this.props.handleMenuItemCancel}
            />
          </DialogActions>
        </Dialog>
      </section>
    );
  }
}

export default EditMenuItem;
