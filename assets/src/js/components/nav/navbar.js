import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
        <div>

            <nav className="navbar-container">
                <Link className="navbar-brand" to="/">PixelSite</Link>
                <a className="nav-options" href="https://github.com/FarahYQ/LiftOff" target="_blank">Git Repo</a>
                <a className="nav-options" href="https://farahyq.github.io/FarahYQPortfolio/" target="_blank">Farah's Portfolio</a>
                <div className="right-nav">
                    <Link className="nav-options" to="/photos/add/">Add Photo</Link>
                </div>
            </nav>
        </div>
        )
    }
}

export default NavBar;