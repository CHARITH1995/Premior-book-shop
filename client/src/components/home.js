import React, { Component } from 'react';
import Container from './container';
import Items from './items'
import Contact from './contact';

class Home extends Component{
    navbar() {
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    render(){
        return(
            <div>
                {this.navbar()}
                <Container />
                <Items />
                <Contact />
            </div>
        );
    }
}
export default Home;