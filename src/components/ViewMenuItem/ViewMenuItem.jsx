import React, { Component } from 'react';
import AdminButtons from '../AdminButtons/AdminButtons';
import styles from './ViewMenuItem.module.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';

var STORAGE_URL = 'https://lycheestroage0001.blob.core.windows.net/';
if (process.env.NODE_ENV === 'production') {
  STORAGE_URL = 'https://lycheestorage9999.blob.core.windows.net/';
}

class ViewMenuItem extends Component {
  state = {
    isLoading: false,
  };
  componentWillUnmount = () => {
    let closeDel = { target: { id: '' } };
    this.props.handleDelMenu(closeDel);
  };

  render() {
    return (
      <section
        id={this.props.item.menuId}
        key={this.props.item.menuId}
        className={styles.item}
      >
        <div className={styles.title}>
          <h3>{this.props.item.name}</h3>
          {this.props.item.pictureKey && (
            <img
              // src={`${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg`}
              alt="menu item"
            />
          )}
        </div>
        <div className={styles.description}>
          <p>{this.props.item.description}</p>
        </div>
        <div className={styles.price}>
          <p>{this.props.item.price}</p>
        </div>
        {this.props.delMenu === String(this.props.item.menuId) ? (
          <Dialog open={true}>
            <DialogTitle>{this.props.item.name}</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this item?</p>
            </DialogContent>
            <DialogActions>
              {this.state.isLoading ? <CircularProgress /> : null}
              <AdminButtons
                submitId=""
                submitTitle="Cancel"
                cancelId={this.props.item.menuId}
                cancelTitle="Yes, Delete"
                submitFunction={this.props.handleDelMenu}
                cancelFunction={this.props.handleMenuItemDelete}
              />
            </DialogActions>
          </Dialog>
        ) : (
          <AdminButtons
            submitId={this.props.item.menuId}
            submitTitle="Edit"
            cancelId={this.props.item.menuId}
            cancelTitle="Delete"
            submitFunction={() => {
              this.props.handleMenuItemEdit(this.props.idx);
            }}
            cancelFunction={this.props.handleDelMenu}
          />
        )}
      </section>
    );
  }
}

export default ViewMenuItem;
