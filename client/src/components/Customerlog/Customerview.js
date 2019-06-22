import React, { Component } from 'react';
import { Link , withRouter} from "react-router-dom";
//import { Image, Panel } from 'react-bootstrap';
import './Customerview.css';

class Customerview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            qty:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
        });
    }

    purch(id) {
        var customerId = JSON.stringify(localStorage.getItem('id'))
        const customer = {
            customerId:customerId,
            bookId:id,
            bookName:this.state.book.name,
            qty:this.state.qty,
            description:this.state.book.description
        }
        fetch("http://localhost:4000/book/addCart/"+id, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(customer)
        }).then(result => result.json())
            .then(json => {
                this.props.history.push("/Cart/"+customerId);
            })
    }
    componentDidMount() {
        fetch("http://localhost:4000/book/Customerview/"+this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    book: data
                });
            });
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
                                <li><a href="/Customerhome">HOME</a></li>
                                <li className="custname"><a href="/Customerhome">{localStorage.getItem('name')}</a></li>
                                <li><a href="/" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                    <h2 className="title">Book Details</h2>
                    <div className="row content">
                        <div class="col-sm-2 sidenav">
                        </div>
                        <div class="col-sm-8 text-left">
                            <div className="well">
                                <span className="glyphicon glyphicon-book logo-small"></span>
                                <ul>
                                    <li><span className="attribute">NAME : </span>"{this.state.book.name}"</li>
                                    <li><span className="attribute">AUTHOR: </span>{this.state.book.author}</li>
                                    <li><span className="attribute">DESCRIPTION : </span>{this.state.book.description}</li>
                                    <li><span className="attribute">PUBLISH YEAR : </span>{this.state.book.PublishYear}</li>
                                    <li><span className="attribute">PUBLISHER : </span>{this.state.book.Publisher}</li>
                                    <li><span className="attribute">AVAILABLE STOCK : </span>{this.state.book.Qty}</li>
                                        <div className="form-group">
                                            <label className="control-labels col-sm-2" for="pwd">QTY :</label>
                                            <div className="qtyfield col-sm-4">
                                                <input type="number" className="form-control" id="qty" placeholder=" Enter Purchasing Quantity" name="qty" value={this.state.qty} onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                    <div className="buttonlist">
                                            <button className="btn btn-success" style={{width:150}} onClick={this.purch.bind(this,this.state.book._id)}>ADD TO CART</button>
                                        </div>
                                </ul>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Customerview);