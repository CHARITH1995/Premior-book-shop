import React, { Component } from 'react';
import '../dashboard.css';
class Dashboard extends Component {
    render() {
        return (
            <div>
                <div id="services" className="container-fluid text-center">
                    <h2>DASHBOARD</h2>
                    <br />
                    <div className="row slideanim">
                        <div className="col-sm-4">
                            <a href="/Addupcomingbook" className="glyphicon glyphicon-book logo-small"></a>
                            <h4>ADD BOOKS</h4>
                            <p>add new book to system</p>
                        </div>
                        <div className="col-sm-4">
                            <a href="/Removeupcomingbook" className="glyphicon glyphicon-off logo-small"></a>
                            <h4>MODIFY DETAILS</h4>
                            <p>Edit or Delete books details</p>
                        </div>
                        <div className="row slideanim">
                        <div className="col-sm-4">
                            <a href="/" className="glyphicon glyphicon-signal logo-small"></a>
                            <h4>VIEW STATISTICS</h4>
                            <p>view sells,new books,stocks</p>
                        </div>
                    <br /><br />
                    </div>
                </div>
            </div>
        </div>

        );
    }
}

export default Dashboard;