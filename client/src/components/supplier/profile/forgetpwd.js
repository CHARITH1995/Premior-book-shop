import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';


class Forgetsuppassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            emailerr:'',
            msg:'',
            show:false,
            showerr:false,
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
            msg:'',
            show:false,
            showerr:false,
            emailerr:'',
        });
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            email:'',
        })
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
                            <li><a href="/">HOME</a></li>
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/#contact">CONTACT US</a></li>  
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    handleSubmit(e) {
        const pwd ={
            email:this.state.email
        }
        e.preventDefault();
        fetch("http://localhost:4000/book/forgetsuppwd",{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(pwd)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                this.setState({
                    msg:json.msg,
                    err:true,
                    show:true
                })
            }else{
                this.setState({
                    msg:json.msg,
                    showerr:true
                })
            }
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
        return formvalid
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                    <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput6">Email :</label>
                            <input type="email" className="form-control" id="exampleFormControlInput6" name="email" placeholder="0000000000V" value={this.state.email} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.emailerr}</span>
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
    reset = () => {
        this.setState({
            password:'',
            cmfpassword:'',
        })
    }
    render() {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h3 className="title">Enter your Email</h3>
                        <div className="row content">
                        <div className="middle">
                        <div className="col-md-3">
                            </div>
                            <div className="col-md-8">
                                <hr />
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
                                <hr />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

export default Forgetsuppassword;