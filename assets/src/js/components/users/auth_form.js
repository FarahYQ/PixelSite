import React, { Component } from 'react';
import * as sessionAPIUtils from '../../utils/session_util';
import axios from 'axios';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile: {
        privacy: "public",
        image: null
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSubmit = this.demoSubmit.bind(this);
  }

  componentWillUnmount() {
    // this.props.clearErrors();
  }

  update(field) {

    return (e) => {
      this.setState({ [field]: e.target.value })
    };
  };

  imageSelectedHandler(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({
          profile: {
            privacy: this.state["profile"]["privacy"],
            image: file
          }
      })
    }
}
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    sessionAPIUtils.signup(user);
  }

  demoSubmit(e) {
    e.preventDefault();
    const eliza = Object.assign({}, { first_name: "Eliza", last_name: "Thornberry",
      email: "jungle@gmail.com",
      password: "jungle"
    });
    // this.props.loginDemo(eliza).then(this.props.closeModal);
  }

  renderErrors() {
    // return(
    //   <ul>
    //     {this.props.errors.map((error, i) => (
    //       <li key={`error-${i}`}>
    //         {error}
    //       </li>
    //     ))}
    //   </ul>
    // );
  }

  render() {
    let mod1;
    let mod2;
    let div_class;
    // if (this.props.formType === 'SIGN UP') {
    if (true) {
      mod1 = (
    <div><input type="username"
      placeholder="Username"
      value={this.state.username}
      onChange={this.update('username')}
      className="login-input"/>
      <br/>
    <input type="first_name"
        placeholder="First Name"
        value={this.state.first_name}
        onChange={this.update('first_name')}
        className="login-input"/>
      <br/>
    <input type="last_name"
        placeholder="Last Name"
        value={this.state.last_name}
        onChange={this.update('last_name')}
        className="login-input"/>
      <br/>
      </div>
      );
      mod2 = (
      <div>
      <select type="last_name"
        placeholder="Last Name"
        value={this.state.privacy}
        onChange={this.update('privacy')}
        className="login-input">
          <option name="public">Public</option>
          <option name="private">Private</option>
      </select>
      <br/>
      <input type="file"
        value={this.state.image}
        onChange={(e) => this.imageSelectedHandler(e)}
        className="login-input"/>
      <br/>
      </div>
      )
      div_class = 'signup'
    } else {
      mod1 = (
      <br/>
      );
      mod2 = (
        <br/>
      );
      div_class = 'login'
    }

    return (
      <div className={div_class}>

        <form onSubmit={(e) => this.handleSubmit(e)} className="session-form-box">

          <button className="fb-btn" onClick={(e) => this.demoSubmit(e)}>DEMO LOGIN</button>
          <div className="session-t1">   </div>
          <br/>
          {/* <div className="session-t2">--- Or {this.props.formType.toLowerCase()} with email ---</div> */}
          <br/>
          <div className="errors">{this.renderErrors()}</div>
        {mod1}
        <input type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.update('email').bind(this)}
            className="login-input"/>
          <br/>
        <input type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.update('password').bind(this)}
            className="login-input"/>
          <br/>
        {mod2}
          <input
            className="session-submit"
            type="submit"
            // value={this.props.formType}
            />
          <br/>
          <div className="session-redirect">
            {/* <div>{this.props.navText}</div> */}
            {/* <div className="session-redirect-btn">{this.props.otherForm}</div> */}
          </div>
        </form>
      </div>
    )
  }

}

export default AuthForm;