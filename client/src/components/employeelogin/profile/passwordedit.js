import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';


class Editpassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password:'',
            cmfpassword:'',
            passworderr:'',
            cmfpassworderr:'',
            oldpassword:'',
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
            passworderr:'',
            cmfpassworderr:'',
        });
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            password:'',
            cmfpassword:'',
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
                                <li><a href="/employeelog">SIGNIN</a></li>  
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    componentDidMount() {
        const id={
            id:this.props.match.params.id
        }
        fetch("http://localhost:4000/book/getemppwd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        }).then(function (response) {
            return response.json();
        }).then(detail => {
            this.setState({
                oldpassword:detail.data.password,
            });
            console.log(this.state.oldpassword)
        });
    }
  
    handleSubmit(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        if (this. handleValidation()) {
            const user = {
                password:this.state.password    
            }
            fetch("http://localhost:4000/book/resetpwd/"+this.props.match.params.id+"/"+this.props.match.params.password, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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
                        this.reset()
                    } else {
                        this.setState({
                            showerr: true,
                            msg: json.msg
                        })
                    }
                })
        }

    }
    handleValidation() {
        let formvalid = true
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
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                    <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput6">Enter new Password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput6" name="password" placeholder="enter yur new password" value={this.state.password} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.passworderr}</span>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput7">Comfirm Password :</label>
                            <input type="password" className="form-control" id="exampleFormControlInput7" name="cmfpassword" placeholder="comfirm your new passowrd" value={this.state.cmfpassword} onChange={this.handleChange} />
                            <span style={{ color: "#FD6571" }}>{this.state.cmfpassworderr}</span>
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
        if((this.state.oldpassword.indexOf(this.props.match.params.password))>=0){
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h3 className="title">Change Profile Password</h3>
                        <div className="row content">
                        <div className="middles">
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
        }else{
            return(
              <div>
              <div className="head">
                  {this.navbar()}
              </div>
              <div className="container-fluid">
                  <h3 className="title">Change Profile Password</h3>
                  <div className="row content">
                  <div className="middle">
                      <div className="col-md-8">
                      <Panel bsStyle="danger" className="text-center">
                          <Panel.Heading>
                            <Panel.Title componentClass="h3">Link Expired!!</Panel.Title>
                          </Panel.Heading>
                        </Panel>
                      </div>
                      </div>
                  </div>
              </div>
          </div>
            )
          }
        }
    }

export default Editpassword;