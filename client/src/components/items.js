import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import './items.css';
//import './dashboard.css';
class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            email:'',
            password:'',
            user:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        let target = e.target;
        let value = target.type ==='checkbox'?target.checked :target.value
        let name = target.name

        this.setState({
            [name]:value,
        });
    }
    handleSubmit(e){
        const user={
            email:this.state.email,
            password:this.state.password
        }
              e.preventDefault();
        fetch("http://localhost:4000/book/log",{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                sessionStorage.setItem('token',json.token);
                localStorage.setItem('name',json.name)
                //console.log(localStorage.getItem('name'));
                //console.log(sessionStorage.getItem('token'));
                this.props.history.push("/Customerhome");
            }
        });


    }

    customerlog() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="container"> 
                    <form className="form-horizontal" >
                        <div className="form-group">
                            <label className="control-label col-sm-1" for="email">Email:</label>
                           <div className="col-sm-2">
                                <input type="email" className="form-control" id="name" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-1" for="pwd">Password:</label>
                            <div class="col-sm-2">
                                <input type="password" className="form-control" id="author" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-3">
                                <button type="submit" class="btn btn-success">LOGIN</button>
                            </div>
                        </div>
                    </form>
                </div>
            </form>
            </div>
        );
    }
    componentDidMount() {
        fetch("http://localhost:4000/book/Booklist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    books: data
                });
            });
    }
    render() {
        return (
            <div>
                <div id="services" className="container-fluid text-center">
                    <h2>Books</h2>
                    <hr />
                    <div className="row">
                    <div class="col-sm-3 sidenav well">
                    <h4 className="custlogin bg-primary"><p className=" text-center">-!! LOGIN HERE !!-</p></h4>
                        {this.customerlog()}
                        </div>
                        <div className="col-md-6 list ">
                        {this.state.books.map(book =>
                                <div className="well">
                                    <ul>
                                    <span className="glyphicon glyphicon-book logo-small"></span>
                                        <li><span className="attribute">NAME : </span>"{book.name}"</li>
                                        <li><span className="attribute">AUTHOR: </span>{book.author}</li>
                                        <div className="buttonlist">
                                        <Link to={"/view/"+book._id} className="btn btn-success">View</Link>
                                        
                                        </div>
                                        
                                        
                                    </ul>
                                    <hr />
                                </div>
                            )
                            }
                        </div>
                        <div class="col-sm-3 sidenav well">
                        </div>
                    </div>
  
                </div>
            </div>

        );
    }
}

export default withRouter(Items);