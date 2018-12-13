import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Supplierprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname:'',
            lname:'',
            email:'',
            password:'',
            id:'',
            tp:'',
            _id:'',
            msg:'',
            show:false,
            showerr:false,
            lnameerr:'',
            fnameerr:'',
            emailerr:'',
            tperr:'',
            Iderr:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            lnameerr: '',
            fnameerr: '',
            emailerr: '',
            tperr: '',
            Iderr: '',
            show: false,
            showerr: false,
        });
    }

    resetForm = () => {
        this.setState({
            fname:'',
            lname:'',
            email:'',
            id:'',
            tp:'',
        })
      }
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    handleValidation() {
        let formvalid = true
        if (this.state.fname !== 'undefined') {
            if (!this.state.fname.match(/^[a-zA-Z]{3,}$/i)) {
                this.setState({
                    fnameerr: 'first name invalid!',
                })
                formvalid = false
            }
        }
        if (this.state.lname !== 'undefined') {
            if (!this.state.lname.match(/^[a-zA-Z]{3,}$/i)) {
                this.setState({
                    lnameerr: 'first name invalid!',
                })
                formvalid = false
            }
        }
        if (this.state.email !== 'undefined') {
            if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                this.setState({
                    emailerr: 'email invalid!',
                })
                formvalid = false
            }
        }
        
        if (this.state.id !== 'undefined') {
            if (!this.state.id.match(/^[1-9]{9}[vVxX]$/i)) {
                this.setState({
                    Iderr: 'NIC invalid!',

                })
                formvalid = false
            }
        }
        return formvalid
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        if (this.handleValidation()) {
            const user = {
                firstname: this.state.fname,
                lastname: this.state.lname,
                email:this.state.email,
                tp:this.state.tp,
                id:this.state.id,
                _id:this.state._id,
            }
            console.log(user)
            fetch("http://localhost:4000/book/supplierupdate", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            show: true,
                            msg: json.msg
                        })
                        this.resetForm()
                    } else {
                        this.setState({
                            showerr: true,
                            msg: json.msg
                        })
                    }
                })
        }

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
                                <li><a href="/#contact">CONTACT US</a></li>
                                <li><a href="#services">DASHBOARD</a></li>
                                <li className="custname"><a href="/updatesupplierprofile">{localStorage.fname}</a></li>
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/book/supplier/" + localStorage.token, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(detail => {
            this.setState({
                fname: detail.data.firstname,
                lname: detail.data.lastname,
                email: detail.data.email,
                id: detail.data.id,
                tp: detail.data.tp,
                city:detail.data.city,
                _id:detail.data._id,
                password:detail.data.password
            });
        });
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1"> First Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="fname" placeholder=" first name" value={this.state.fname} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.fnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput2">Last Name :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput2" name="lname" placeholder=" last name" value={this.state.lname} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.lnameerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput3">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput3" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput4">Telephone number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput4" name="tp" placeholder="name@example.com" value={this.state.tp} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.tperr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput5">NIC number :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput5" name="id" placeholder="0000000000V" value={this.state.id} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.Iderr}</span>
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="update" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
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
                <h3 className="title">Supplier Details Update</h3>
                <div className="container">
                    <div className="row content">
                        <hr />
                        <div className="col-md-2">
                        </div>
                        <div className="col-sm-8">
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
                                    this.state.show ? (
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
                            <div>
                                {this.formfield()}
                            </div>
                            <div className="editbuttongroup">
                                    <div className="viewbutton">
                                        <Link to={"/editsupplierpassword/"+ this.state._id+"/"+this.state.password  } className="glyphicon glyphicon-circle-arrow-right">EditPassword</Link>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
}
}
export default Supplierprofile;