import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

const Signup = (props) => {
  return (
    <main>
      <SignupForm {...props} handleSignupOrLogin={props.handleSignupOrLogin} />
    </main>
  );
};

export default Signup;
