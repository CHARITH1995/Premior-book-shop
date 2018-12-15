const express = require('express');
const router = express.Router();
const supplier= require('../models/supplier');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

module.exports.Supplierlog = (req, res, next) => {
    //console.log(req.body.email)
    supplier.findOne({
        email: req.body.email
    }, function (err, user) {
        //console.log(user)
        if (!user) {
            return res.json({ success: false, msg: 'Authentication fail , User not found' })
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign(user.toJSON(), 'secretkey');
                return res.json({ success: true, token: token, type: user.type, fname: user.firstname ,id:user._id});
            } else {
                return res.json({ success: false, msg: 'Authentication fail.wrong password' });
            }
        }
    });
}
module.exports.Supplieradd = (req, res, next) => {
            supplier.findOne({
                email: req.body.email
            }).then(function (data) {
                if (data) {
                    return res.json({ success: false, msg: 'email already taken' })
                } else {
                    //console.log(req.body)
                    supplier.findOne({
                        id: req.body.id
                    }).then(function (data) {
                        if (data) {
                            return res.json({ success: false, msg: 'Id already taken' })
                        } else {
                              var salt = bcrypt.genSaltSync(10);
                            var hash = bcrypt.hashSync(req.body.password, salt);
                            var Supplier = new supplier({
                                firstname: req.body.fname,
                                lastname: req.body.lname,
                                email: req.body.email,
                                tp: req.body.tp,
                                id: req.body.id,
                                city:req.body.city,
                                password: hash,
                                date: Date.now()
                            }
                            )
                            Supplier.save((err, doc) => {
                                console.log(err)
                                //console.log(Employee)
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
}

//Employeereg
module.exports.editdetail = (req, res, next) => {
    jwt.verify(req.params.token, 'secretkey', (err, authorizedData) => {
      if (err) {
        console.log('ERROR: Could not connect to the protected route');
        res.send({ success: false, msg: 'please log again' });
      } else {
         // console.log(authorizedData)
        return res.json({ data: authorizedData });
      }
    })
  }
  module.exports.getname = (req, res, next) => {
    jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
      if (err) {
        console.log('ERROR: Could not connect to the protected route');
        res.send({ success: false, msg: 'please log again' });
      } else {
        supplier.findOne({
            _id:req.body.id
        }).then(function(name){
            if(name){
            console.log(name.firstname)
            return res.json(name.firstname)
            }
        })
      }
    })
  }
  module.exports.updatedetail = (req, res, next) => {
    jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
      if (err) {
        console.log('ERROR: Could not connect to the protected route');
        res.send({ success: false, msg: 'please log again' });
      } else {  
        supplier.findOneAndUpdate({
            _id: req.body._id
        }, req.body).then(function (doc) {
            console.log(doc)
            if (!doc) {
                res.json({ success: false ,msg:'fail!!'});
            } else {
                res.json({ success: true ,msg:'successfully updated !! Log again'});
            }
        })
      }
    })
  }
  module.exports.resetpwd = (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var pwd = req.params.password;
    var myquery = { password: pwd }
    var newvalues = { $set: { _id: req.params.id, password: hash } };
    supplier.updateOne(myquery, newvalues, function (err, doc) {
      if (doc) {
        return res.json({ success: true, msg: 'successfully updated!' });
      } else {
        return res.json({ success: false, msg: 'cannot finish your request!!' });
      }
    });
  }
  module.exports.mailverify = (req, res, next) => {
    // console.log(req.body.email)
    supplier.findOne({
      email: req.body.email
    }, function (err, infor) {
      if (infor) {   ///resetpwd/:id/:password
        link ='http://localhost:3000/editpassword/'+ infor._id +'/'+infor.password;
        console.log(link)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "charithprasanna009@gmail.com",
            pass: '0771034162'
          }
        });
        var mailOptions = {
            to: infor.email,
            from: "charithprasanna009@gmail.com",
            subject: 'Sending Email using Node.js',
            text:link
          }; 
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.json({ success: false, msg: 'message sending fail!!' })
          } else {
            console.log('Email sent: ' + info.response);
            return res.json({ success: true, msg: 'check your inbox and reset the pwd' })
          }
        });
  
      } else {
        return res.json({ success:false, msg: 'email incorrect!!' })
      }
    })
  }//resetpwd
  

//
