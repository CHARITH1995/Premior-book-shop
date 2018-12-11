const express= require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const cors=require('cors');
const routes = require('./routes/api');
const path=require("path");
require("dotenv").config();


mongoose.connect('mongodb://admin:admin123@ds235418.mlab.com:35418/bookshop',{ useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("db connected")
    }else{
        console.log("error in db")
    }
});


mongoose.Promise = global.Promise;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.static(path.join(__dirname, "client", "build")))
app.use('/book',routes);


app.listen(process.env.port|| 4000,function(){
    console.log("listening")
});