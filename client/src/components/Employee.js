import React, { Component } from 'react';
import Navbar from './navbar';
import Container from './container';
import Dashboard from './dashboard';
import Contact from './contact';

class Employee extends Component{
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
export default Employee;