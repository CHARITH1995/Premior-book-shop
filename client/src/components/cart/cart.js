import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import Container from '../container';
import Contact from '../contact';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

    }

    componentDidMount() {///getCartData/:customerId
        var customerId = JSON.stringify(localStorage.getItem('id'))
        fetch("http://localhost:4000/book/getCartData/"+customerId, {
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
                    books:data.data
                });
            });
    }

    delete(id) {
        var customerId = JSON.stringify(localStorage.getItem('id'))
        fetch("http://localhost:4000/book/removeFromCart/"+id+"/"+customerId, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(result => result.json())
            .then(json => {
                if(json.success){
                    window.location.reload();
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
                            <li><a href="/Customerhome">HOME</a></li>
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
                                <li><span className="attribute">NAME : </span>"{book.BookName}"</li>
                                <li><span className="attribute">DESCRIPTION: </span>{book.description}</li>
                                <li><span className="attribute">QTY: </span>{book.qty}</li>
                                <div className="buttonlist">
                                    <Link to={"/Customerview/" + book._id} className="btn btn-success">BUY</Link>
                                    <button className="btn btn-danger" style={{width:100}} onClick={this.delete.bind(this,book.BookId)}>REMOVE</button>
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
        console.log(this.state)
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

export default withRouter(Cart);