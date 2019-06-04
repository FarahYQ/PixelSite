import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, login, clearErrors } from '../../actions/session_actions';
import AuthForm from './auth_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "SIGN UP",
    navText: <div className="session-redirect-text">Already have an account? </div>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    loginDemo: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));