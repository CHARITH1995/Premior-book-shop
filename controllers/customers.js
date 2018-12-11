const express = require('express');
const router = express.Router();
const customers = require('../models/Customer');
const jwt = require('jsonwebtoken');

module.exports.log=(req,res,next)=>{
    customers.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            res.status(401).send({ success: false, msg: 'Authentication faiil,User not found' })
        } else {
            if (req.body.password === user.password) {
                var token = jwt.sign(user.toJSON(), 'secretkey');
                res.json({ success: true, token: 'JWT' + token, name: user.name });
            } else {
                res.status(401).send({ success: false, msg: 'Authentication fail.wrong password' });
            }
        }
    });
}

module.exports.customerlist=(req,res,next)=>{
    customers.find().then(function (info) {
        res.send(info);
    });
}

module.exports.customerreg=(req,res,next)=>{
    var Customers = new customers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        date: req.body.date,
    });
    Customers.save((err, doc) => {
        if (!err) {
            console.log("pass")
            res.json({ success: true });
        } else {
            res.json({ success: false })
        }
    })
}

module.exports.customerremove=(req,res,next)=>{
    customers.findOneAndDelete({
        _id: req.params.id
    }).then(function (err) {
        if (!err) {
            res.json({ success: false })
        } else {
            res.json({ success: true })
        }
    });
}


