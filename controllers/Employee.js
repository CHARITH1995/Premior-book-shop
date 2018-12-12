const express = require('express');
const router = express.Router();
const employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.Employeelog = (req, res, next) => {
    //console.log(req.body.email)
    employee.findOne({
        email: req.body.email
    }, function (err, user) {
        //console.log(user)
        if (!user) {
            return res.json({ success: false, msg: 'Authentication fail , User not found' })
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign(user.toJSON(), 'secretkey');
                return res.json({ success: true, token: token, type: user.type, fname: user.firstname });
            } else {
                return res.json({ success: false, msg: 'Authentication fail.wrong password' });
            }
        }
    });
}
module.exports.Employeeadd = (req, res, next) => {
    jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            employee.findOne({
                email: req.body.email
            }).then(function (data) {
                if (data) {
                    return res.json({ success: false, msg: 'email already taken' })
                } else {
                    //console.log(req.body)
                    employee.findOne({
                        id: req.body.id
                    }).then(function (data) {
                        if (data) {
                            return res.json({ success: false, msg: 'Id already taken' })
                        } else {
                            var salt = bcrypt.genSaltSync(10);
                            var hash = bcrypt.hashSync(req.body.password, salt);
                            var Employee = new employee({
                                firstname: req.body.fname,
                                lastname: req.body.lname,
                                email: req.body.email,
                                tp: req.body.tp,
                                id: req.body.id,
                                password: hash,
                                date: Date.now()
                            }
                            )
                            Employee.save((err, doc) => {
                                console.log(err)
                                console.log(Employee)
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
    });

}

//Employeereg
