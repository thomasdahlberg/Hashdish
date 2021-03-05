import React, { Component } from 'react';
import AdminButtons from '../../AdminButtons/AdminButtons';
import EditItemDescription from '../EditItemDescription/EditItemDescription';
import EditItemOptionCategory from '../EditItemOptionCategory/EditItemOptionCategory';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';
import { axiosApiInstance as API } from '../../../utils/axiosConfig';

const STORAGE_URL = 'https://homecookimages.blob.core.windows.net/';

class EditMenuItem extends Component {
  state = this.props.addMenuItem
    ? this.populateAddItemForm()
    : this.populateUpdateItemForm();

  populateUpdateItemForm() {
    return {
      name: this.props.item.name,
      description: this.props.item.description || '',
      price: this.props.item.price,
      category: this.props.item.category,
      optionalOptions: this.props.optionDefs
        ? this.props.optionDefs.optional
        : [],
      requiredOptions: this.props.optionDefs
        ? this.props.optionDefs.required
        : [],
      image: this.props.item.pictureKey
        ? `${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg`
        : null,
      open: true,
      isLoading: false,
    };
  }

  populateAddItemForm() {
    return {
      name: '',
      description: '',
      price: '',
      category: '',
      optionalOptions: [],
      requiredOptions: [],
      image: null,
      open: true,
      isLoading: false,
    };
  }

  handleUpdateItem = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
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
        category: this.state.category,
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
        await this.props.handleGetKitchen();
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleAddItem = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const optionDefs = {
      required: this.state.requiredOptions,
      optional: this.state.optionalOptions,
    };
    const stringifiedOptionDefs = JSON.stringify(optionDefs);

    await API.post(
      `/kitchen/menu`,
      Object.assign({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        optionDefinitions: stringifiedOptionDefs,
      }),
    )
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response);
          // if (
          //   this.state.image &&
          //   this.state.image.startsWith('data:image/jpeg;base64')
          // ) {
          //   await API.patch(`/kitchen/menu/picture/${item.menuId}`, {
          //     data: this.state.image.split(',')[1],
          //   }).then((response) => {
          //     if (response.status === 200) {
          //       console.log(response);
          //     }
          //   });
        }
      })
      .then(async (response) => {
        await this.props.handleGetKitchen();
      })
      .finally(() => {
        this.setState({ isLoading: false });
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
    console.log('option change');
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
    if (this.props.item) {
      this.props.handleMenuItemCancel();
    }
  };

  render() {
    return (
      <section
        id={this.props.item ? this.props.item.menuId : 'newItem'}
        key={this.props.item ? this.props.item.menuId : 'newItem'}
      >
        <Dialog open={true}>
          <DialogTitle>
            {this.props.item ? 'Update' : 'Add'} Item
          </DialogTitle>
          <DialogContent>
            <EditItemDescription
              itemName={this.state.name}
              itemImage={this.state.image}
              itemDescription={this.state.description}
              itemPrice={this.state.price}
              itemCategory={this.state.category}
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
            {this.state.isLoading ? <CircularProgress /> : null}
            <AdminButtons
              submitId={
                this.props.item ? this.props.item.menuId : null
              }
              submitTitle={this.props.item ? 'Update' : 'Add Item'}
              cancelId={
                this.props.item
                  ? this.props.item.menuId
                  : 'addMenuItem'
              }
              cancelTitle="Cancel"
              submitFunction={
                this.props.item
                  ? this.handleUpdateItem
                  : this.handleAddItem
              }
              cancelFunction={
                this.props.item
                  ? this.props.handleMenuItemCancel
                  : this.props.handleAddItemForm
              }
            />
          </DialogActions>
        </Dialog>
      </section>
    );
  }
}

export default EditMenuItem;
