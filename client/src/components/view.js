import React,{Component} from 'react';

class View extends Component{
    constructor(props) {
        super(props);
        this.state = {
            book: []
        };

    }
    componentDidMount() {
        fetch("http://localhost:4000/book/"+this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    book:data
                });
            });
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
                                <li><a href="/">HOME</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    render(){
        return(
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                <h2 className="title">Book Details</h2>
                    <div className="row content">
                        <div class="col-sm-2 sidenav">
                        </div>
                        <div class="col-sm-8 text-left">
                                <div className="well">
                                <span className="glyphicon glyphicon-book logo-small"></span>
                                    <ul>
                                        <li><span className="attribute">NAME : </span>"{this.state.book.name}"</li>
                                        <li><span className="attribute">AUTHOR: </span>{this.state.book.author}</li>
                                        <li><span className="attribute">DESCRIPTION : </span>{this.state.book.description}</li>
                                        <li><span className="attribute">PUBLISH YEAR : </span>{this.state.book.PublishYear}</li>
                                        <li><span className="attribute">PUBLISHER : </span>{this.state.book.Publisher}</li>
                                        <li><span className="attribute">AVAILABLE STOCK : </span>{this.state.book.Qty}</li>
                                       
                                    </ul>
                                    <hr />
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default View;