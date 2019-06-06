import React, { Component } from 'react';

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
    this.handleRedirect = this.handleRedirect.bind(this);
  }


  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
    };
  };

  handleRedirect(loc) {
    return (e) => {
      this.props.history.push(loc);
    }
  }

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
  handleSubmit() {
    // e.preventDefault();
    let user;
    if (this.props.formType === 'LOG IN') {
      user = {username: this.state.username, password: this.state.password}
    } else {
      user = Object.assign({}, this.state);
    }
    this.props.processForm(user)
  }

  demoSubmit(e) {
    e.preventDefault();
    const fizzy = {username: "FizzyQ", password: "demopassword"}
    this.props.loginDemo(fizzy);
  }

  renderErrors() {
    const errors = this.props.errors;
    return (
      <div>
        <ul>
          {Object.keys(errors).map((key, index) => {
              const keyMessage = key === 'non_field_errors' ? "" : `${key}:`;
              return <li className="session-error-items" key={index}>{`${keyMessage} ${errors[key]}`}</li>
          })}
        </ul>
      </div>
    )
  }
  
  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    let mod1;
    let mod2;
    let otherForm;
    let otherFormText;
    if (this.props.formType === 'SIGN UP') {
      mod1 = (
    <div>
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
      <input type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.update('email').bind(this)}
            className="login-input"/>
        <br/>
      </div>
      );
      mod2 = (
      <div>
      <select type="privacy"
        value={this.state.privacy}
        onChange={this.update('privacy')}
        className="login-input">
          <option name="public">Public</option>
          <option name="private">Private</option>
      </select>
      <br/>
      <div className="profile-image-input-title">Profile Image (optional, jpeg or jpg only)</div>
      <input type="file"
        value={this.state.image}
        onChange={(e) => this.imageSelectedHandler(e)}
        className="login-input"/>
      <br/>
      </div>
      )
      otherForm = '/login';
      otherFormText = 'LOG IN'
    } else {
      mod1 = (
      <br/>
      );
      mod2 = (
        <br/>
      );
      otherForm = '/register';
      otherFormText = 'SIGN UP'
    }

    return (
      <div className="session-form">
        <form onSubmit={(e) => this.handleSubmit(e)} className="session-form-box">
          <div className="welcome-title">Welcome to PixelSite!</div>
          <button className="demo-btn" onClick={(e) => this.demoSubmit(e)}>DEMO LOGIN</button>
          <div className="session-t1">   </div>
          <br/>
          <div className="session-t2"> -- or {this.props.formType.toLowerCase()} with email --</div>
          <br/>
          <input type="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.update('username')}
          className="login-input"/>
        <br/>
        {mod1}
        <input type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.update('password').bind(this)}
            className="login-input"/>
          <br/>
        {mod2}
          <div className="session-errors">{this.renderErrors()}</div>
          <input
            className="session-submit"
            type="submit"
            value={this.props.formType}
            />
          <br/>
          <div className="session-redirect">
            <br/>
            <div>{this.props.navText}</div>
            <button className="session-redirect-btn" onClick={this.handleRedirect(otherForm)}>{otherFormText}</button>
          </div>
        </form>
      </div>
    )
  }

}

export default AuthForm;