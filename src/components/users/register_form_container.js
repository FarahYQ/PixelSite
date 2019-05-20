import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import AuthForm from './auth_form';
// import { openModal, closeModal } from '../../actions/modal_actions';



const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "SIGN UP",
    navText: <div className="session-redirect-text">Already have an account? </div>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user))
    // loginDemo: (user) => dispatch(login(user)),
    // otherForm: (
    //   <button onClick={() => dispatch(openModal('login'))}>
    //     Log In
    //   </button>
    // ),
    // closeModal: () => dispatch(closeModal()),
    // clearErrors: () => dispatch(clearErrors())
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
export default AuthForm;