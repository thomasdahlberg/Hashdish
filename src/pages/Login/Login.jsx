import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';

const Login = (props) => {
  return (
    <>
      <h1 className={styles.header}>Login</h1>
      <LoginForm />
    </>
  );
};

export default Login;
