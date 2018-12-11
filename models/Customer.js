const mongoose= require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('usecreateIndexes',true);

const Customers= new Schema({
    name:{
        type:String,
        require:'name field cant be empty',
        unique:true
    },
    email:{
        type:String,
        require:'author field is required'

    },
    password:{
        type:String,
        require:'this field cannpt be empty',
        minlength:[6,'password must be atleast six characters']
    },
    address:{
        type:String,
        require:'description is required'
    },
    date:{
        type:String,
        require:'join year field cannot be empty'
    },
   

});
 module.exports=mongoose.model('Customers',Customers);