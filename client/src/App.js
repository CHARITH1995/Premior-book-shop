import React, { Component } from 'react';
import Employee from './components/Employee';
import Addbooks from './components/Books/addbooks';
import Booklist from './components/Books/removebooks';
import Editbook from './components/Books/editbooks';
import Purchase from './components/Purchase/purchase';
import CustomerList from './components/Cutomer/customer';
import Home from './components/home';
import View from './components/view';
import About from './components/about';
import Customerlog from './components/Customerlog/Customerhome';
import Customerview from './components/Customerlog/Customerview';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
         <div>
        <Route  exact path="/" component={Home}/>
        <Route  path="/Employee" component={Employee}/>
        <Route  path="/Addbooks" component={Addbooks}/>
        <Route  path="/Booklist" component={Booklist}/>
        <Route  path="/edit/:id" component={Editbook}/>
        <Route  path="/Purchase" component={Purchase}/>
        <Route  path="/Customerlist" component={CustomerList}/>
        <Route  path="/view/:id" component={View}/>
        <Route  path="/About" component={About}/>
        <Route  path="/Customerhome" component={Customerlog}/>
        <Route  path="/Customerview/:id" component={Customerview}/>
      </div>

      </Router>
     
    );
  }
}

export default App;
