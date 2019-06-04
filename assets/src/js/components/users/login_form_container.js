import React from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import AuthForm from './auth_form';
import { withRouter } from 'react-router-dom';


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "LOG IN",
    navText: <div className="session-redirect-text">New to PixelSite? </div>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(login(user)),
    loginDemo: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));
