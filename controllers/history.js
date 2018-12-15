const express = require('express');
const router = express.Router();
const books = require('../models/Books');
const items = require('../models/Items');
const jwt = require('jsonwebtoken');



module.exports.showbooks = (req, res, next) => {
    var today = new Date();
    var num;
    var thismonth = today.getMonth()+1; //January is 0!
    //console.log(thismonth)
    var thisyear = today.getFullYear();
    jwt.verify(req.headers['authorization'],'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
          books.aggregate([{$match:{month:thismonth,year:thisyear,Status:"unsold"}},{$group:{_id:{type:"$type"},total:{$sum:1}}}]).then(function(details){
              //console.log(details)
          return res.json(details);
          })
             }
        });
}//bookshow
module.exports.bookshow = (req, res, next) => {
    var today = new Date();
    var num;
    var thismonth = today.getMonth()+1; //January is 0!
    //console.log(thismonth)
    var thisyear = today.getFullYear();
    jwt.verify(req.headers['authorization'],'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
          books.aggregate([{$match:{month:thismonth,year:thisyear}}]).then(function(details){
              console.log(details)
          return res.json(details);
          })
             }
        });
}//bookshow