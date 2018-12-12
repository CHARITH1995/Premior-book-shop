import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'react-bootstrap';
import Navbar from './navbar';
import '../Books/addbooks.css';

class Addupcomingbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            show:true,
            msg:'',
            price:'',
            type:'',
            typeerr:false,
            description: '',
            publish_year: '',
            publisher: '',
            qty: '',
            price:'',
            items:[],
            authorerr: '',
            showerr: false,
            showsuc: false,
            msg: '',
            file: null,
            imagename:''
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
            authorerr:'',
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
           // console.log(details.data)
            if (details.success) {
                this.setState({
                    items:details.data
                })
            } else {
                this.setState({
                    show: false,
                    msg: details.msg
                })
            }
        });
            console.log(this.state.items)
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
                author: this.state.author,
                description: this.state.description,
                publish_year: this.state.publish_year,
                imagename: this.state.image,
                price:this.state.price,
                type:this.state.type,
                supname:localStorage.fname,
                publisher: this.state.publisher,
            }
            console.log(book)
            fetch("http://localhost:4000/book/upcomingaddimage", {
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
            fetch("http://localhost:4000/book/addupcomingadd", {
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
                            showsuc:true,
                            msg:json.msg
                        })
                        this.resetForm();
                    } else {
                        this.setState({
                            showerr:true,
                            msg:json.msg
                        })
                    }

                });

        }
    }
    validate() {
        let formvalid = true;
        if (!this.state.author.match(/^([a-zA-Z' ]+)$/)) {
            this.setState({
                authorerr:'check the Author name',
            })
            formvalid = false
        }
        if (this.state.type === 'undefined') {
            this.setState({
                typeerr:'insert the book type',
            })
            formvalid = false
        }
        return formvalid
    }
    resetForm() {
        this.setState({
            ...this.state,
            name: '',
            type:1,
            author: '',
            price:'',
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
                        <h2 className="booktitle">Add a Upcoming Book Details</h2>
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
                                    <span style={{color: "#FD6571"}}>{this.state.authorerr}</span>
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
                                <label className="control-label col-sm-2" for="pwd">Price :</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" id="price" placeholder="Enter book price" name="price" value={this.state.price} onChange={this.handleChange} required />
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
                                        this.state.items.map(item=>{
                                            <option value={item.name}>{item.name}</option>
                                        })
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
    render() {
        return (
            <div>
                <div className="head">
                <Navbar />
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
export default Addupcomingbook;