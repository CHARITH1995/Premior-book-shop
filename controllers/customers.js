const express = require('express');
const router = express.Router();
const customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

module.exports.log=(req,res,next)=>{
    customer.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            return res.status(401).send({ success: false, msg: 'Authentication faiil,User not found' })
        } else {
            if (req.body.password === user.password) {
                var token = jwt.sign(user.toJSON(), 'secretkey');
                res.json({ success: true, token: 'JWT' + token, name: user.name });
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


