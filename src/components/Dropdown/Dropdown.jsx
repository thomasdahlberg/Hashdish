import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.dropdown = React.createRef();
    }
    state = this.getInitialState();

    getInitialState() {
        return {
            user: this.props.user,
            listOpen: false
        }
    }

    handleDropdown = (e) => {
        e.preventDefault();
        let listNode = this.dropdown.current;
        if (listNode.style.display === 'none') {
            listNode.style.display = 'flex';
        } else {
            listNode.style.display = 'none';
        }
    }

    handleDropdownClick = (e) => {
        e.preventDefault();
        if(e.target.id === "logout") {
            this.props.handleLogout();
        }
        let listNode = this.dropdown.current;
        listNode.style.display = 'none';
    }

    render() {
        return(
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <button href="#" onClick={this.handleDropdown}><i className="fa fa-bars"></i></button>
                </div>
                <div className={styles.list} ref={this.dropdown} >
                {this.props.user ? (
                    <Fragment>
                            <Link to="/menu">Menu</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/" id="logout" onClick={this.props.handleLogout}>Log Out</Link>
                    </Fragment>
                ) : (
                    <Fragment>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                    </Fragment>
                )
                }
                </div>
            </div>
        )
    }
}

export default Dropdown;