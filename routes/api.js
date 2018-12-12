const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const jwtHelper = require('../config/jwtHelper');
const books = require('../controllers/books');
const customers = require('../controllers/customers');
const purchases = require('../controllers/purchases');
const items = require('../controllers/items');
const employee = require('../controllers/Employee');
const upbooks = require('../controllers/upcomingbooks');
const supplier = require('../controllers/supplier');



router.post('/add',books.addbook);//http://localhost:4000/book/Employeelog
router.post('/Booklist',books.showbooks);
router.post('/addimage',books.addnewbook);
router.post('/additem',items.additem);
router.delete('/removeitem/:id',items.removeitem);
router.post('/showitems',items.showitems);
router.put('/Update/:id',books.updatebooks);
router.delete('/Delete/:id',books.bookremove);
router.get('/:id',books.show);
router.get('/Customerview/:id',books.showcustomer);
router.post('/log',customers.log);
router.post('/Customerlist',customers.customerlist);
router.post('/Customeradd',customers.customerreg);
router.delete('/Custdel/:id',customers.customerremove);
router.delete('/Reject/:id',purchases.purchremove);
router.post('/Purchase', purchases.purchlist);
router.post('/addPurch',purchases.newpurch);//http://localhost:4000/book/Supplierreg
router.post('/Employeereg',employee.Employeeadd);//http://localhost:4000/book/Employeereg
router.post('/Employeelog',employee.Employeelog);//http://localhost:4000/book/Supplierlog  
router.post('/Supplierreg',supplier.Supplieradd);
router.post('/Supplierlog',supplier.Supplierlog);
router.post('/upcomingaddimage',upbooks.addnewbook);
router.get('/up/:id',upbooks.show);
router.post('/addupcomingadd',upbooks.addbook);
router.put('/Updatenewbook/:id',upbooks.updatebooks);
router.post('/UpcomingBooklist',upbooks.showbooks);
router.delete('/Deleteupcoming/:id',upbooks.bookremove);
/*router.post('/add',upbooks.addbook);//http://localhost:4000/book/Employeelog
router.post('/Booklist',upbooks.showbooks);
router.post('/addimage',upbooks.addnewbook);
router.post('/additem',upbooks.additem);
router.delete('/removeitem/:id',upbooks.removeitem);
router.post('/showitems',upbooks.showitems);
router.put('/Update/:id',upbooks.updatebooks);
router.delete('/Delete/:id',upbooks.bookremove);
router.get('/:id',upbooks.show);
*/
//router.get('/Customerview/:id',books.showcustomer);



module.exports = router;