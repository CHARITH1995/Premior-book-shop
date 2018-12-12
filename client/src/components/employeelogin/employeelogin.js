import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { withRouter ,Link} from "react-router-dom";
import './employeelogin.css';

class Employeelogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            msg: '',
            passworderr:'',
            show: false,
            showerr: false,
            emailerr: '',
            is_Mounted:true
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
            emailerr: '',
            passworderr:'',
            show: false,
            showerr: false,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        //alert(this.state.is_Mounted)
        if(this.state.is_Mounted){
        if (this.handleValidation()) {
            const employee = {
                password:this.state.password,
                email: this.state.email,
            }
            fetch("http://localhost:4000/book/Employeelog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(employee)
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    if (json.success) {
                    this.unmount();
                    localStorage.setItem('token',json.token);
                    localStorage.setItem('type',json.type);
                    localStorage.setItem('fname',json.fname);
                        this.setState({
                            show:true,
                            msg:json.msg,
                        })
                       this.props.history.push("/employee"); 
                    } else {
                        this.setState({
                            showerr:true,
                            msg: json.msg
                        })
                    }
                })
        }
    }
    }
    unmount(){
            this.setState({
                is_Mounted:false
            })
    }
    resetForm = () => {
        this.setState({
            email: '',
            password:'',
        })
    }
    reset = () => {
        this.setState({
            password:'',
        })
    }
    handleValidation() {
        let formvalid = true
        if (this.state.email !== 'undefined') {
            if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                this.setState({
                    emailerr: 'email invalid!',
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
                                <li><a href="/">HOME</a></li>
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
                            <label htmlFor="exampleFormControlInput1">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="name@example.com" value={this.state.email} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput2" name="password" placeholder="0000000000V" value={this.state.password} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.passworderr}</span>
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
                    <h3 className="title">EMPLOYEE-LOGGING</h3>
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
export default withRouter(Employeelogin);