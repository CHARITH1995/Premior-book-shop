import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import './customer.css';

class Customerlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };

    }
    componentDidMount() {
        fetch("http://localhost:4000/book/Customerlist", {
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
                    customers:data
                });
            });
    }
    delete(id) {
        console.log(id);
        fetch("http://localhost:4000/book/Custdel/" + id, {
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
                            <a className="navbar-brand" href="#myPage">PREMIER</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/Employee">DASHBOARD</a></li>
                                <li><a href="/">HOME</a></li>
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
                            {this.state.customers.map(customer =>
                                <div className="well">
                                    <ul>
                                        <li><span className="attribute">ID : </span>{customer._id}</li>
                                        <li><span className="attribute">NAME : </span>{customer.name}</li>
                                        <li><span className="attribute">EMAIL: </span>{customer.email}</li>
                                        <li><span className="attribute">ADDRESS : </span>{customer.address}</li>
                                        <li><span className="attribute">JOIN DATE : </span>{customer.date}</li>
                                        <div className="buttonlists">
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, customer._id)}>Delete</button>
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
export default Customerlist;