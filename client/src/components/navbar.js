import React, { Component } from 'react';
import './navbar.css';
//import {Image} from 'react-bootstrap';
class Navbar extends Component {
    nav() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#myPage">PREMIER</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/#contact">CONTACT US</a></li>
                                <li><a href="#services">DASHBOARD</a></li>
                                <li><a href="#">LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.nav()}

            </div>
        );
    }
}
export default Navbar;