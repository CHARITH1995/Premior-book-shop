const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Books= new Schema({
    name:{
        type:String,
        require:'name field cant be empty',
        unique:true
    },
    empname:{
        type:String,
        require:'name field cant be empty',
    },
    empid:{
        type:String,
        require:'name field cant be empty',
    },
    author:{
        type:String,
        require:'author field is required'

    },
    imagename:{
        type:String,
        require:'description is required'
    },
    description:{
        type:String,
        require:'description is required'
    },
    PublishYear:{
        type:String,
        require:'publish year field cannot be empty'
    },
    Publisher:{
        type:String,
        require:'pulisher cannot be empty'
    },
    Qty:{
        type:Number,
        require:'Qty is required'
    },
    type:{
        type:String,
        require:'Type is required'
    },
    price:{
        type:Number,
        require:'price is required'
    },
    Status:{
        type:String,
        default:"unsold"
    },
    inserteddate:{
        type:Date,
        require:'price is required'
    },
    month:{
        type:Number,
        require:'price is required'
    },
    year:{
        type:Number,
        require:'price is required'
    },

});
 module.exports=mongoose.model('Books',Books);