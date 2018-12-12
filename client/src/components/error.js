import React, { Component } from 'react';
import './error.css';


class Error extends Component {
 
    render() {
        return (
            <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>Hey !! please log first </h2>
                </div>
                <a href="/employeelog">Go TO HOME PAGE</a>
            </div>
        </div>
        );

    }

}


export default Error;