const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
//const jwtHelper = require('../config/jwtHelper');
const books = require('../controllers/books');
const customers = require('../controllers/customers');
const purchases = require('../controllers/purchases');




router.post('/add',books.addbook);
router.post('/Booklist',books.showbooks);
router.post('/addimage',books.addnewbook);
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
router.post('/addPurch',purchases.newpurch)



module.exports = router;