import React, { Component } from 'react';
import {
 OverlayTrigger, Popover, Panel
    , Table
} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import './itemtypes.css';


class Itemtypes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            show: true,
            name: '',
            nameerr: '',
            msg: '',
            delmsg: '',
            showerr:false,
            showsuc:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                                {
                                    (localStorage.type ==='employee')?(
                                        <li><a href="/Employee">DASHBOARD</a></li>
                                    ):(
                                        <li><a href="/supplier">DASHBOARD</a></li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        const item = {
            name: this.state.name,
        }
        e.preventDefault();
        if(this.handleValidation()){
        fetch("http://localhost:4000/book/additem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': authToken
            },
            body: JSON.stringify(item)
        }).then(res => res.json())
            .then(details => {
                if (details.success) {
                    this.setState({
                        items: details.data,
                        msg: details.msg,
                        showsuc:true,
                    })
                } else {
                    this.setState({
                        showerr:true,
                        msg: details.msg
                    })
                }
            })
        window.location.reload();
        }
    }
    removeitem(id) {
        var authToken = localStorage.token;
        //console.log(authToken)
        fetch("http://localhost:4000/book/removeitem/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'authorization': authToken
            },
        }).then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({
                    msg:"successfully Deleted!!!",
                    showsuc:true,
                })
                window.location.reload();
            } else {
                this.setState({
                    msg:"Cannot Delete!!",
                    showerr:true
                })
            }
        })
    }
    handleValidation(){
        let formvalid=true
        if(!this.state.name){
            this.setState({
                nameerr:'field cannot be empty'
            })
            formvalid=false;
        }
        if(this.state.name !== "undefined"){
            if(!this.state.name.match(/^([a-zA-Z' ]+)$/)){
                this.setState({
                    nameerr:'name field not valid'
                })
                formvalid=false;
            }
        }
        return formvalid;
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            msg:'',
            showsuc:false,
            showerr:false
        });
    }
    form() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Enter the Item Type</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="Item Name" value={this.state.name} onChange={this.handleChange} required />
                        <span style={{ color: "#FD6571" }}>{this.state.nameerr}</span>
                    </div>
                   
                    <div className="form-group col-md-2">
                         <div className="additembutton">
                        <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                    </div>
                    </div>
                </form>
            </div>
        )
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
                    show:true,
                })
            } else {
                this.setState({
                    showerr: true,
                    msg:'nothing to show!!'
                })
            }
        });
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong>
            </Popover>
        );
        
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
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
                                        this.state.showerr ? (
                                            <div className="message text-center">
                                                <Panel bsStyle="danger" className="table">
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
                        <h3 className="title">ITEM TYPES </h3>
                        <div className="col-sm-3">
                            {this.form()}
                        </div>
                        <div className="col-sm-8">
                            {
                                this.state.show ? (
                                    <Table responsive className="table">
                                        <thead>
                                            <tr>
                                                <th>Item Type</th>
                                                <th>Inserted At</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>{
                                            this.state.items.map(item =>
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    {
                                                        ((localStorage.type === 'employee')||(localStorage.type === 'admin')) ?
                                                        (
                                                            <td><OverlayTrigger
                                                                trigger={['hover', 'focus']}
                                                                placement="bottom"
                                                                overlay={popoverHoverFocus}
                                                            >
                                                                <button className="btn btn-danger" onClick={this.removeitem.bind(this, item._id)}>Remove</button>
                                                            </OverlayTrigger></td>
                                                            
                                                        ) : (
                                                            <div className="buttonlists">
                                                            </div>
                                                        )
                                                    }
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                        <Panel bsStyle="danger" className="table">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                    )
                            }
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                </div>
            );
    }
}
export default Itemtypes;