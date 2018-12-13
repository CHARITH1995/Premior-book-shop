import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../navbar.css';
//import {Image} from 'react-bootstrap';
class Navbar extends Component {
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        //sessionStorage.clear();
        this.props.history.push("/")
    }
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
                                <li><a href="/supplier">DASHBOARD</a></li>
                                <li className="custname"><a href="/updatesupplierprofile">{localStorage.fname}</a></li>
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
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
export default withRouter(Navbar);