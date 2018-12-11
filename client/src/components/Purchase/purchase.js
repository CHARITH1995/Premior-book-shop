import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import './purchase.css';

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: []
        };

    }
    /*success(id){
        fetch("http://localhost:4000/book/Success"+id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(result => result.json())
        .then(json => {
            if (json.success) {
                console.log(json)
                window.location.reload();

            } else {
                console.log(json)
            }
        })
    }*/
    componentDidMount() {
        fetch("http://localhost:4000/book/Purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    purchases:data
                });
            });
    }
    delete(id){
        fetch("http://localhost:4000/book/Reject/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(result => result.json())
        .then(json => {
            if (json.success) {
                console.log(json)
                window.location.reload();
            } else {
                console.log(json)
            }
        })
    }
  
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
                            <a className="navbar-brand" href="#myPage">Logo</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/Employee">DASHBOARD</a></li>
                                <li><a href="/">LOGOUT</a></li>
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
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                    <div className="row content">
                        <div class="col-sm-2 sidenav">
                        </div>
                        <div class="col-sm-8 text-left">
                        {this.state.purchases.map(purchase =>
                                <div className="well">
                                <span class="glyphicon glyphicon-lock logo-small"></span>
                                    <ul>
                                        <li><span className="attribute">Purchase id : </span>{purchase._id}</li>
                                        <li><span className="attribute">Customer : </span>{purchase.Name}</li>
                                        <li><span className="attribute">Email: </span>{purchase.Items}</li>
                                        <li><span className="attribute">Address : </span>{purchase.Amount}</li>
                                        <li><span className="attribute">Is Valid ? </span>{purchase.isValid}</li>
                                        <div className="buttonlists">
                                            <button className="btn btn-success" /*onClick={this.success.bind(this, purchase._id)}*/>Accept</button>
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, purchase._id)}>Reject</button>
                                        </div>
                                    </ul>
                                    <hr />
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Purchase;