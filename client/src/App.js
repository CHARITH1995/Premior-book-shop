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
import Itemtypes from './components/Items/itemtypes.js';
import Customerlog from './components/Customerlog/Customerhome';
import Customerview from './components/Customerlog/Customerview';
import Employeeregister from './components/employeelogin/employeeregister';//Employeelogin
import Employeelogin from './components/employeelogin/employeelogin';// Editupcomingbook   UpcomingBooklist  
import Supplierregister from './components/supplier/supplierregister';
import Supplierlogin from './components/supplier/supplierlog';
import Supplier from './components/supplieractivity/supplier';
import Addupcomingbook from './components/supplieractivity/addupcomingbooks';
import Editupcomingbook from './components/supplieractivity/editupcomingbook';
import UpcomingBooklist from './components/supplieractivity/removeupcomingbooks';
import Employeeprofile from './components/employeelogin/profile/employeeupdate';
import Passwordchange from './components/employeelogin/profile/passwordedit';
import Forgetpassword from './components/employeelogin/profile/forgetpwd';
import Supplierprofile from './components/supplier/profile/supplierupdate';
import Suppasswordchange from './components/supplier/profile/passwordedit';
import Forgetsuppassword from './components/supplier/profile/forgetpwd';
import Error from './components/error';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
         <div>
        <Route exact path="/" component={Home}/>  
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/employee" component={Employee}/> :
             <Route path="/Error" component={Error} />}
              <Redirect from="/employeereg" to="/Error" />
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/Addbooks" component={Addbooks}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/Booklist" component={Booklist}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/employeereg" component={Employeeregister}/> :
             <Route path="/Error" component={Error} />}
            <Redirect from="/employeereg" to="/Error" />
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/Purchase" component={Purchase}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/edit/:id" component={Editbook}/>:
            <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {(((localStorage.token)&&((localStorage.type)==='employee'))||((localStorage.token)&&((localStorage.type))==='supplier')) ? <Route  path="/items" component={Itemtypes}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/Customerlist" component={CustomerList}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/Customerlist" component={CustomerList}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='supplier')) ?<Route  path="/supplier" component={Supplier}/>  :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='supplier')) ? <Route  path="/Addupcomingbook" component={Addupcomingbook}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='supplier')) ? <Route  path="/Editupcomingbook/:id" component={Editupcomingbook}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='supplier')) ? <Route  path="/Removeupcomingbook" component={UpcomingBooklist}/> :
             <Route path="/Error" component={Error} />}
              <Redirect from="/employeereg" to="/Error" />
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='employee')) ? <Route  path="/updateprofile" component={Employeeprofile}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Switch>
            {((localStorage.token)&&((localStorage.type)==='supplier')) ? <Route  path="/updatesupplierprofile" component={Supplierprofile}/> :
             <Route path="/Error" component={Error} />}
        </Switch>
        <Route  path="/editpassword/:id/:password" component={Passwordchange}/>
        <Route  path="/editsupplierpassword/:id/:password" component={Suppasswordchange}/>
        <Route  path="/forgetsuppassword" component={Forgetsuppassword}/>
        <Route  path="/forgetpassword" component={Forgetpassword}/>
        <Route  path="/employeelog" component={Employeelogin}/>
        <Route  path="/supplierregister" component={Supplierregister}/>
        <Route  path="/supplierlog" component={Supplierlogin}/> 
        <Route  path="/About" component={About}/>
        <Route  path="/Customerhome" component={Customerlog}/>
        <Route  path="/Customerview/:id" component={Customerview}/>
        <Route  path="/view/:id" component={View}/>  
      </div>
       </Router>
     
    );
  }
}

export default App;
