import React, { Component } from 'react';
import {Table , Panel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './history.css';


class Reports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            books: [],
            show: true,
            name: '',
            nameerr: '',
            msg: '',
            delmsg: '',
            showerr: false,
            showsuc: false,
        }
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
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
                                {
                                    (localStorage.type === 'employee') ? (
                                        <li><a href="/Employee">DASHBOARD</a></li>
                                    ) : (
                                            <li><a href="/supplier">DASHBOARD</a></li>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/book/bookreport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': authToken
            },
        }).then(res => res.json())
            .then(details => {
                if (details) {
                    console.log(details)
                    this.setState({
                        items: details,
                        show: true,
                    })
                } else {
                    this.setState({
                        showerr: true,
                        msg: 'nothing to show!!'
                    })
                }
            });
        fetch("http://localhost:4000/book/bookinsert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': authToken
            },
        }).then(res => res.json())
            .then(details => {
                if (details) {
                    console.log(details)
                    this.setState({
                        books: details,
                        show: true,
                    })
                } else {
                    this.setState({
                        showerr: true,
                        msg: 'nothing to show!!'
                    })
                }
            });
    }
    bookstable() {
        return (
            <div>
            <div className="col-md-3">
            </div>
                <div className="col-sm-8">
                <h3 className="titles">Inserted Books of this Month</h3>
                    {
                        this.state.show ? (
                            <Table responsive className="table">
                                <thead>
                                    <tr>
                                        <th>Item Type</th>
                                        <th>Inserted Date</th>
                                        <th>Book Type</th>
                                        <th>Number of books</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    this.state.books.map(book =>
                                        <tr>
                                            <td>{book.name}</td>
                                            <td>{book.inserteddate}</td>
                                            <td>{book.type}</td>
                                            <td>{book.Qty}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        ) : (
                                <Panel bsStyle="danger" className="table">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                    </Panel.Heading>
                                </Panel>
                            )
                    }
                </div>
            </div>
        )
    }
    bookstype() {
        return (
            <div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-8">
                <h3 className="titles">Sold Books Details of this Month</h3>
                    {
                        this.state.show ? (
                            <Table responsive className="table">
                                <thead>
                                    <tr>
                                        <th>Item Type</th>
                                        <th>Number of Items sold</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    this.state.items.map(item =>
                                        <tr>
                                            <td>{item._id.type}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        ) : (
                                <Panel bsStyle="danger" className="table">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                    </Panel.Heading>
                                </Panel>
                            )
                    }
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                    {/* {
                                        this.state.showsuc ? (
                                            <div className="message">
                                                <Panel bsStyle="success" className="text-center">
                                                    <Panel.Heading>
                                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                    </Panel.Heading>
                                                </Panel>
                                            </div>
                                        ) : (
                                                <div>
                                                </div>
                                            )
                                    }
                                    {
                                        this.state.showerr ? (
                                            <div className="message text-center">
                                                <Panel bsStyle="danger" className="table">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                            </div>
                                        ) : (
                                                <div>
                                                </div>
                                            )
                                    } */}
                <div>
                <div className="col-sm-2 sidenavs">
                            <div className="list-group ">
                                <a className="list-group-item active">QUICK LINKS</a>
                                <a className="list-group-item"><Link to={"/items"}>item Type</Link></a>
                                <a className="list-group-item"><Link to={"/Removeupcomingbook"}>Check upcoming List</Link></a>
                                <a className="list-group-item"><Link to={"/Addupcomingbook"}>Add up coming book</Link></a>
                                <a className="list-group-item"><Link to={"/updatesupplierprofile"}>Profile</Link></a>
                            </div>
                        </div>
                </div>
                <div>
                    {this.bookstype()}
                    
                    {this.bookstable()}
                    </div>
                </div>
            </div>
        );
    }
}
export default Reports;