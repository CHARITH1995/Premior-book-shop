const express = require('express');
const router = express.Router();
const upcomingbooks = require('../models/upcomingbooks');
//const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


let imagename = '';
let number ;
const storage = multer.diskStorage({
    destination: './client/public/stores',
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});
const upload = multer({
    storage: storage
}).single('file');

module.exports.addnewbook = (req, res, next) => {
            upload(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    imagename = req.file.filename;
                   // console.log(imagename)
                }
            });
        }

module.exports.addbook=(req,res,next)=>{
    var today = new Date();
    var num;
    var thismonth = today.getMonth()+1; //January is 0!
    var thisyear = today.today.getFullYear()
    upcomingbooks.findOne({
            name:req.body.name
        }).then(function(data){
            if(data){
                return res.json({success:false,msg:'book already exists'})
            }else{
                var Books = new upcomingbooks({
                    name: req.body.name,
                    supid:req.body.supid,
                    supname:req.body.supname,
                    author: req.body.author,
                    description: req.body.description,
                    publish_year: req.body.publish_year,
                    type:req.body.type,
                    price:req.body.price,
                    Publisher: req.body.publisher,
                    imagename:req.body.imagename,
                    inserteddate:today,
                    month:thismonth,
                    year:thisyear
                });
                Books.save((err, doc) => {
                    console.log(err)
                    if (!err) {
                        res.json({ success: true,msg:'successfully inserted!!' });
                    } else {
                        res.json({ success: false ,msg:'ERROR!!' })
                    }
                })
            }
        })        
}
module.exports.showbooks=(req,res,next)=>{
    upcomingbooks.find().then(function (details) {
       // console.log(details)
        if(details.length == 0){
            return res.json({success:false,msg:'nothing to show'})
        }else{
            //console.log(details)
           return res.json({success:true,data:details})
        }
       
    })
}
module.exports.updatebooks=(req,res,next)=>{
    upcomingbooks.findOneAndUpdate({
        _id: req.params.id
    }, req.body).then(function (doc) {
        console.log(doc)
        if (!doc) {
            res.json({ success: false ,msg:'fail!!'});
        } else {
            res.json({ success: true ,msg:'successfully updated!'});
        }
    })
   /* console.log(req.body)
    console.log(req.params.id)
    upcomingbooks.findOne({
        name:req.body.name                            
    }).then(function(err,doc){
        console.log(doc._id)
        console.log(doc._id !== req.params.id)
        if(doc._id !== req.params.id){
           
           
        }else{
            return res.json({success:false ,msg:'this book already exists'})  
        }
    })*/
    
}
module.exports.show=(req,res,next)=>{
    upcomingbooks.findById(req.params.id, function (err, book) {
        console.log(err)
        console.log(book)
        if (!err) {
            res.json(book);
        } else {
            res.json({ success: false })
        }
    })
}
/*
module.exports.showcustomer=(req,res,next)=>{
    books.findById(req.params.id, function (err, book) {
        if (!err) {
            res.json(book);
        } else {
            res.json({ success: false })
        }
    })
}//bookremove
*/
module.exports.bookremove=(req,res,next)=>{
    //console.log("hello")
    upcomingbooks.findByIdAndRemove(req.params.id, function (err, book) {
        console.log(err)
        if (!err) {
          return  res.json({ success:true,msg:'successfully deleted!!' })
        } else {
          return  res.json({ success: false ,msg:'cannot delete!!' })
        }
    })
}//bookremove