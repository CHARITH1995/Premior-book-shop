import React, { Component } from 'react';
import { withRouter} from "react-router-dom";
import Navbar from './navbar';
import Container from '../container';
import Dashboard from './supdashboard';
import Contact from '../contact';

class Supplier extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <Container />
                <Dashboard />
                <Contact />
            </div>
        );
    }
}
export default withRouter(Supplier);