import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import './employeelogin.css';

class Employeeregister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname:'',
            lname:'',
            email:'',
            id:'',
            password:'',
            passworderr:'',
            cmfpassworderr:'',
            cmfpassword:'',
            tp:'',
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
    logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        //sessionStorage.clear();
        this.props.history.push("/")
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
            passworderr:'',
            cmfpassworderr:'',
            show: false,
            showerr: false,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var authToken = localStorage.token;
        this.setState({
            show: false,
            showerr: false,
        })
        if (this.handleValidation()) {
            const employee = {
                fname:this.state.fname,
                lname:this.state.lname,
                password:this.state.password,
                id:this.state.id,
                tp:this.state.tp,
                email:this.state.email,
            }
            fetch("http://localhost:4000/book/Employeereg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                   // 'authorization': authToken
                },
                body:JSON.stringify(employee)
            }).then(res => res.json())
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
    resetForm = () => {
        this.setState({
            ...this.state,
            fname: '',
            lname: '',
            id: '',
            email: '',
            password:'',
            cmfpassword:'',
            subarea: '',
            tp: ''
        })
    }
    reset = () => {
        this.setState({
            password:'',
            cmfpassword:'',
        })
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
        if (this.state.tp !== 'undefined') {
            if (!this.state.tp.match(/^[0-9\-\+]{10}$/i)) {
                this.setState({
                    tperr: 'telephone invalid!',

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
        if (this.state.password.length < 8) {
            this.setState({
              passworderr: 'password cannot accept',
            })
            this.reset();
            formvalid = false
          }
          if (this.state.cmfpassword !== this.state.password) {
            this.setState({
              cmfpassworderr: 'password comfirmation fail!',
            })
            this.reset();
            formvalid = false
          }
        return formvalid
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
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/#contact">CONTACT US</a></li>
                                <li><a href="#services">DASHBOARD</a></li>
                                <li className="custname"><a href="#">{localStorage.fname}</a></li>
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
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
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput6">Password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput6" name="password" placeholder="0000000000V" value={this.state.password} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.passworderr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput7">Comfirm Password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput7" name="cmfpassword" placeholder="0000000000V" value={this.state.cmfpassword} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.cmfpassworderr}</span>
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="submit" value="Submit" className="btn btn-success" />
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
                    <h2 className="title">NEW-EMPLOYEE</h2>
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
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            );
    }
}
export default Employeeregister;