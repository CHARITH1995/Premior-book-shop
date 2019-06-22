const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Cart= new Schema({
    customerId:{
        type:String,
    },
    BookId:{
        type:String,
        unique:true
    },
    BookName:{
        type:String,
    },
    qty:{
        type:String,
    },
    description:{
        type:String
    }

});
 module.exports=mongoose.model('Cart',Cart);