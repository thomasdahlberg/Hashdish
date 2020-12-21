import React, { Component } from 'react';
import ViewItemOptions from '../ViewItemOptions/ViewItemOptions';
import styles from './ViewMenuItem.module.css';

const STORAGE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hashdish.blob.core.windows.net/'
    : 'https://homecookimages.blob.core.windows.net/';

class ViewMenuItem extends Component {
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
              src={`${STORAGE_URL}pictures/${this.props.item.pictureKey}.jpg`}
              alt="menu item"
            />
          )}
        </div>
        <div className={styles.description}>
          <p>{this.props.item.description}</p>
        </div>
        <div className={styles.description}>
          <ViewItemOptions
            title="Required"
            optionsCategories={this.props.itemRequiredOptionDefs}
          />
        </div>
        <div className={styles.description}>
          <ViewItemOptions
            title="Optional"
            optionsCategories={this.props.itemOptionalOptionDefs}
          />
        </div>
        <div className={styles.price}>
          <p>{this.props.item.price}</p>
          {this.props.delMenu === String(this.props.item.menuId) ? (
            <div className={styles.admindel}>
              <p>Are you sure you want to delete this item?</p>
              <div className={styles.edit}>
                <button id="" onClick={this.props.handleDelMenu}>
                  Cancel
                </button>
              </div>
              <div className={styles.del}>
                <button
                  id={this.props.item.menuId}
                  onClick={this.props.handleMenuItemDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.admin}>
              <div className={styles.edit}>
                <button
                  id={this.props.item.menuId}
                  onClick={() => {
                    this.props.handleMenuItemEdit(this.props.idx);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className={styles.del}>
                <button
                  id={this.props.item.menuId}
                  onClick={this.props.handleDelMenu}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default ViewMenuItem;
