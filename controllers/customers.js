const express = require('express');
const router = express.Router();
const customer = require('../models/Customer');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.log=(req,res,next)=>{
    customer.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            return res.status(401).send({ success: false, msg: 'Authentication faiil,User not found' })
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign(user.toJSON(), 'secretkey');
                res.json({ success: true, token: 'JWT' + token, name: user.firstname,id:user._id });
            } else {
            return res.status(401).send({ success: false, msg: 'Authentication fail.wrong password' });
            }
        }
    });
}

module.exports.customerlist=(req,res,next)=>{
    customer.find().then(function (info) {
        res.send(info);
    });
}

module.exports.customerreg=(req,res,next)=>{
   // console.log("reg")
    var Customer = new customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        date: req.body.date,
    });
    Customer.save((err, doc) => {
        if (!err) {
           // console.log("pass")
            res.json({ success: true });
        } else {
            res.json({ success: false })
        }
    })
}

module.exports.customerremove=(req,res,next)=>{
    customer.findOneAndDelete({
        _id: req.params.id
    }).then(function (err) {
        if (!err) {
            res.json({ success: false,msg:'ERROR!' })
        } else {
            res.json({ success: true,msg:'successfully delete!!' })
        }
    });
}

module.exports.addCart=(req,res,next)=>{
    var cart = new Cart({
        customerId:req.body.customerId,
        BookId:req.body.bookId,
        BookName:req.body.bookName,
        qty:req.body.qty,
        description:req.body.description
    });
    cart.save((err, doc) => {
        if (!err) {
            res.json({ success: true });
        } else {
            res.json({ success: false })
        }
    })
}

module.exports.getCartBooks=(req,res,next)=>{
    Cart.find({
        customerId:req.params.customerId
    }, function (err, data) {
        if (err) {
            return res.status(401).send({ success: false})
        } else {
            return res.status(200).send({ success: true, data:data });
        }
    });
}//removeBooksFromCart

module.exports.removeBooksFromCart=(req,res,next)=>{
    Cart.findOneAndDelete({
        BookId:req.params.bookId,
        customerId:req.params.customerId
    }, function (err, data) {
        if (err) {
            return res.status(401).send({ success: false})
        } else {
            return res.status(200).send({ success: true});
        }
    });
}

module.exports.Customeradd = (req, res, next) => {
    // jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
    //     if (err) {
    //         console.log('ERROR: Could not connect to the protected route');
    //         res.send({ success: false, msg: 'please log again' });
    //     } else {
            customer.findOne({
                email: req.body.email
            }).then(function (data) {
                if (data) {
                    return res.json({ success: false, msg: 'email already taken' })
                } else {
                    //console.log(req.body)
                    customer.findOne({
                        id: req.body.id
                    }).then(function (data) {
                        if (data) {
                            return res.json({ success: false, msg: 'Id already taken' })
                        } else {
                            var salt = bcrypt.genSaltSync(10);
                            var hash = bcrypt.hashSync(req.body.password, salt);
                            var Customer = new customer({
                                firstname: req.body.fname,
                                lastname: req.body.lname,
                                email: req.body.email,
                                tp: req.body.tp,
                                id: req.body.id,
                                password: hash,
                                date: Date.now()
                            }
                            )
                            Customer.save((err, doc) => {
                                if (!err) {
                                    return res.json({ success: true, msg: 'successfully registered!' });
                                } else {
                                    return res.json({ success: false, msg: 'ERROR!!' })
                                }
                            })
                        }
                    });
                }
            });
       // }
   // });

}


