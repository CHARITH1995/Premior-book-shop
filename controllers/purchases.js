const express = require('express');
const router = express.Router();
const purchase = require('../models/Purchase');
const jwt = require('jsonwebtoken');

module.exports.purchremove=(req,res,next)=>{
    purchase.findOneAndDelete({
        _id: req.params.id
    }).then(function(err) {
        if (!err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    })
}
module.exports.purchlist=(req,res,next)=>{
    purchase.find().then(function (info) {
        res.send(info);
    });
}

module.exports.newpurch=(req,res,next)=>{
    var purch = new purchase({
        Name: req.body.name,
        Items: req.body.items,
        Date: req.body.date,
        Amount: req.body.amount
    });
    purch.save((err, doc) => {
        if (err) {
            console.log(err)
            res.json({ success: false });
        } else {
            console.log("pass")
            res.json({ success: true })
        }
    })
}

