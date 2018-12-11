import React, { Component } from 'react';
import {Image} from 'react-bootstrap';
import Container from './container';
import Contact from './contact';
import './about.css';
class About extends Component {
    navbar(){
        return(
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
                            <li><a href="/">HOME</a></li>
                            <li><a href="/#contact">CONTACT US</a></li>  
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        );
    }
    about() {
        return (
            <div>
                <div id="about" className="container-fluid">
                {this.navbar()}
                    <div className="row">
                        <div className="col-sm-8">
                            <h2>Company Page</h2><br />
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        </div>
                        <div className="col-sm-4">
                         
                            <Image src="assets/2.jpg" className="imagedetails" />
              
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-white">
                    <div className="row">
                        <div class="col-sm-4">
                            <span className="glyphicon glyphicon-book logo slideanim"></span>
                        </div>
                        <div className="col-sm-8">
                            <h2>What we do?</h2><br />
                            <h4><strong>MISSION:</strong> Our mission lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br />
                            <p><strong>VISION:</strong> Our vision Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return(
            <div>
            <Container />
            {this.about()}
            <Contact />
        </div>
        );
      
    }
}
export default About;