import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import Container from '../container';
import Contact from '../contact';

class Customerhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

    }

    componentDidMount() {
        fetch("http://localhost:4000/book/Booklist", {
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
                    books: data
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
                                <li><a href="/#contact">CONTACT US</a></li>
                                <li className="custname"><a href="#">{localStorage.getItem('name')}</a></li>
                                <li><a href="/" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    booklist() {
        return (
            <div>
                <div className="col-md-5 ">
                    {this.state.books.map(book =>
                        <div className="well">
                            <ul>
                                <span className="glyphicon glyphicon-book logo-small"></span>
                                <li><span className="attribute">NAME : </span>"{book.name}"</li>
                                <li><span className="attribute">AUTHOR: </span>{book.author}</li>
                                <div className="buttonlist">
                                    <Link to={"/Customerview/" + book._id} className="btn btn-success">View</Link>

                                </div>
                                </ul>
                            <hr />
                        </div>
                    )
                    }
                </div>
            </div>

        );
    }
    render() {
        return (
            <div>
                {this.navbar()}
                <Container />
                <div id="services" className="container-fluid ">
                    <h2>Books</h2>
                    <hr />
                    <div className="row">
                        <div class="col-sm-3 sidenav">
                        </div>
                        {this.booklist()}
                        <div class="col-sm-3 sidenav">
                        </div>
                    </div>

                </div>
                <Contact />
            </div>

        );
    }
}

export default withRouter(Customerhome);