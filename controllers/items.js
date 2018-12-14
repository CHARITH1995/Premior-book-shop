const express = require('express');
const router = express.Router();
const items = require('../models/Items');
const jwt = require('jsonwebtoken');

module.exports.removeitem = (req, res, next) => {
    jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
    items.findOneAndDelete({ _id: req.params.id }).then(function (err) {
        if (!err) {
            res.send({ success: false, msg: 'not success' });
        } else {
            res.send({ success: true, msg: 'delete successfully' });
        }
    });
}
    })
}

module.exports.additem = (req, res, next) => {
    jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
    var today = new Date();
    var det = new items({
        name: req.body.name,
        date: Date.now()
    });
    det.save((err, doc) => {
        if (!err) {
            return res.json({ success: true, msg: 'new Item type inserted!!' })
        }
        else {
            return res.json({ success: false, msg: 'ERROR!!' })
        }
    })
}
    })
}//showitems

module.exports.showitems = (req, res, next) => {
    jwt.verify(req.headers['authorization'], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var item=[]
    items.find().then(function (details) {
        //console.log(details)
        if (details.length == 0) {
            return res.json({ success: false, msg: 'no Items Types' });
        } else {
            // details.map(detail=>{
            //     item.push(detail.name)
            // })
            // //console.log(item)
            return res.json(details);
        }
    })
}
})
}
