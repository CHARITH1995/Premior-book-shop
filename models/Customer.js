const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Customers= new Schema({
    firstname:{
        type:String,
        require:'first name field cant be empty',
    },
    lastname:{
        type:String,
        require:'last name field cant be empty',
    },
    email:{
        type:String,
        require:'author field is required'
    },
    type:{
        type:String,
        default:"employee",
    },
    tp:{
        type:Number,
        require:'this field cannpt be empty',
        minlength:[10,'password must be atleast six characters']
    },
    password:{
        type:String,
        require:'this field cannpt be empty',
        minlength:[8,'password must be atleast six characters']
    },
    id:{
        type:String,
        require:'description is required'
    },
    date:{
        type:Date,
        require:'join year field cannot be empty'
    },
   

});

const customer=mongoose.model('Customers',Customers);
module.exports =customer
