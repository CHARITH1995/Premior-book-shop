import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Image, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Books/removebooks.css';
import Navbar from './navbar';
import Contact from '../contact';

class UpcomingBooklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true,
            loadingmsg: '',
            msg: '',
            showsuc: false,
            showerr: false,
        };

    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/book/UpcomingBooklist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': authToken
            },
        }).then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log(data)
                if (data.success) {
                    this.setState({
                        books:data.data
                    });
                } else {
                    this.setState({
                        loading:false,
                        loadingmsg:data.msg
                    });
                }
            });
    }
    delete(id) {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/book/Deleteupcoming/"+ id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': authToken
            },
        }).then(result => result.json())
            .then(json => {
                console.log(json)
                if (json.success) {
                    this.setState({
                        showsuc: true,
                        msg: json.msg
                    })
                    window.location.reload();

                } else {
                    if (json.success) {
                        this.setState({
                            showerr: true,
                            msg: json.msg
                        })
                    }
                }
            })
    }
    render() {
        return (
            <div>
                <div className="head">
                <Navbar />
                </div>
                <div className="container-fluid">
                    <h2 className="tit">Books Details</h2>
                    {
                        this.state.showerr ? (
                            <div className="message">
                                <Panel bsStyle="danger" className="text-center">
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
                        this.state.loading ? (
                            <div className="row content">
                                <div class="col-sm-2 sidenav">
                                </div>
                                <div class="col-sm-8 text-left">
                                    {this.state.books.map(book =>
                                        <div className="well">
                                            <Image src={"../../stores/" + book.imagename} className="storeimage" />
                                            <div className="listview">
                                                <ul>
                                                    <li><span className="attribute">NAME : </span>"{book.name}"</li>
                                                    <li><span className="attribute">AUTHOR: </span>{book.author}</li>
                                                    <li><span className="attribute">DESCRIPTION : </span>{book.description}</li>
                                                    <li><span className="attribute">PUBLISH YEAR : </span>{book.publish_year}</li>
                                                    <li><span className="attribute">PUBLISHER : </span>{book.Publisher}</li>
                                                    <li><span className="attribute">SUPPLIER : </span>{book.supname}</li>
                                                    <div className="buttonlists">
                                                        <Link to={"/Editupcomingbook/" + book._id} className="btn btn-info">Edit</Link>
                                                        <button className="btn btn-danger" onClick={this.delete.bind(this, book._id)}>Delete</button>
                                                    </div>
                                                </ul>
                                                <hr />
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        ) : (
                                <div className="message">
                                    <Panel bsStyle="danger" className="text-center">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">{this.state.loadingmsg}</Panel.Title>
                                        </Panel.Heading>
                                    </Panel>
                                </div>
                            )
                    }
                </div>
                <Contact />
            </div>
        );
    }
}
export default UpcomingBooklist;