const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new Schema({
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
    city:{
        type:String,
        required:'city field is required'
    },
    id:{
        type:String,
        require:'description is required'
    },
    date:{
        type:Date,
        require:'join year field cannot be empty'
    },
    type:{
        type:String,
        default:"supplier",
    },
   

});

module.exports = mongoose.model('Supplier',Supplier);

