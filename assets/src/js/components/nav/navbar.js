import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(e) {
        e.preventDefault();
        // this.props.logout().then(() => this.props.history.push("/"))
        this.props.logout();
    }

    render() {
        let rightNav;
        let leftNav;
        if (this.props.currentUser) {
            leftNav = (
                <Link className="nav-options" to="/photos/add/">Add Photo</Link>
            )
            rightNav = (
                <div className="right-nav">
                    <span className="nav-options nav-username">{this.props.currentUser.username}</span>
                    <button className="nav-options-btn" onClick={(e) => this.handleLogout(e)}>Logout</button>
                </div>
            )
        } else {
            leftNav = (<span></span>)
            rightNav = (
                <div className="right-nav">
                    <Link className="nav-options" to="/register/">Signup</Link>
                    <Link className="nav-options" to="/login/">Login</Link>
                </div>
            )
        }
        return (
        <div>

            <nav className="navbar-container">
                <Link className="navbar-brand" to="/">PixelSite</Link>
                {leftNav}
                {rightNav}
            </nav>
        </div>
        )
    }
}

const mapStateToProps = ( {session, entities: { users } } ) => {
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);