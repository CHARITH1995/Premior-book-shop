import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'react-bootstrap';
import './addbooks.css';

class Addbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            arr: [1, 2, 3, 4],
            show: true,
            msg: '',
            price: '',
            type: '',
            typeerr: false,
            description: '',
            publish_year: '',
            publisher: '',
            qty: '',
            price: '',
            items: [],
            authorerr: '',
            showerr: false,
            showsuc: false,
            msg: '',
            file: null,
            imagename: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChange = this.fileChange.bind(this);
    }
    fileChange = (e) => {
        const name = e.target.files[0];
        this.setState({
            file: e.target.files[0],
            imagename: name.name,
        })
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name

        this.setState({
            [name]: value,
            authorerr: '',
            showerr: false,
            showsuc: false,
        });
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/book/showitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': authToken
            },
        }).then(res => res.json())
            .then(details => {
                if (details) {
                    this.setState({
                        items: details,
                    })
                } else {
                    this.setState({
                        show: false,
                        msg: details.msg
                    })
                }
            });
        // console.log(this.state.items)
    }
    handleSubmit(e) {
        e.preventDefault();
        var authToken = localStorage.token;
        if (this.validate()) {
            const fd = new FormData();
            fd.append('file', this.state.file);
            this.state.image = this.state.imagename
            const book = {
                name: this.state.name,
                empid: localStorage.id,
                empname: localStorage.fname,
                author: this.state.author,
                description: this.state.description,
                publish_year: this.state.publish_year,
                imagename: this.state.image,
                price: this.state.price,
                type: this.state.type,
                publisher: this.state.publisher,
                qty: this.state.qty
            }
            console.log(book)
            fetch("http://localhost:4000/book/addimage", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*",
                    'authorization': authToken
                },
                body: fd
            });
            fetch("http://localhost:4000/book/add", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            showsuc: true,
                            msg: json.msg
                        })
                        this.resetForm();
                    } else {
                        this.setState({
                            showerr: true,
                            msg: json.msg
                        })
                    }

                });

        }
    }
    validate() {
        let formvalid = true;
        if (!this.state.author.match(/^([a-zA-Z' ]+)$/)) {
            this.setState({
                authorerr: 'check the Author name',
            })
            formvalid = false
        }
        if (this.state.type === 'undefined') {
            this.setState({
                typeerr: 'insert the book type',
            })
            formvalid = false
        }
        return formvalid
    }
    resetForm() {
        this.setState({
            ...this.state,
            name: '',
            type: 1,
            author: '',
            price: '',
            description: '',
            publish_year: '',
            publisher: '',
            qty: ''
        })
    }
    add() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <h2 className="booktitle">Add new Book Details</h2>
                        <form className="form-horizontal" >
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="email">Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="name" placeholder="Enter book name" name="name" value={this.state.name} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Author:</label>
                                <div class="col-sm-8">
                                    <input type="text" className="form-control" id="author" placeholder="Enter Auhtor name" name="author" value={this.state.author} onChange={this.handleChange} required />
                                    <span style={{ color: "#FD6571" }}>{this.state.authorerr}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Description:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Description" placeholder="Enter book description" name="description" rows="4" cols="5" value={this.state.description} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Image:</label>
                                <div className="col-sm-8">
                                    <input type="file" className="form-control" id="exampleFormControlInput1" name="Image" onChange={this.fileChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Published Year:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Description" placeholder="Enter book publish year" name="publish_year" rows="4" cols="5" value={this.state.publish_year} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Publisher :</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Description" placeholder="Enter book publisher" name="publisher" rows="4" cols="5" value={this.state.publisher} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Quantity :</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="qty" placeholder="Enter book quantity" name="qty" value={this.state.qty} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Book Type :</label>
                            <div className="col-sm-8">
                            <select className="form-control" id="Select1" name="type" value={this.state.type} onChange={this.handleChange}>
                                <span style={{ color: "#FD6571" }}>{this.state.typeerr}</span>
                                <option value="1">select type</option>
                                {
                                    this.state.show ? (
                                        this.state.items.map(item=>
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    ):(
                                        <div className="message">
                                                <Panel bsStyle="success" className="text-center">
                                                    <Panel.Heading>
                                                        <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                    </Panel.Heading>
                                                </Panel>
                                        </div>
                                    )
                                } 
                            </select>
                            </div>
                        </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Price :</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="price" placeholder="Enter book price" name="price" value={this.state.price} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-5">
                                    <button type="submit" class="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </form>
            </div>
        );
    }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        //sessionStorage.clear();
        this.props.history.push("/")
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
                            <a className="navbar-brand" href="/">PREMIER</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/Employee">DASHBOARD</a></li>
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
                <div className="container-fluid text-center">
                    <div className="row content">
                        <div>
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
                        </div>
                        {this.add()}
                    </div>
                </div>
            </div>
        );
    }
}
export default Addbook;