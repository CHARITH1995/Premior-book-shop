const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Upcomingbooks = new Schema({
    name:{
        type:String,
        require:'name field cant be empty',
        unique:true
    },
    supname:{
        type:String,
        require:'name field cant be empty',
        unique:true
    },
    author:{
        type:String,
        require:'author field is required'

    },
    publish_year:{
        type:String,
        require:'publish year field cannot be empty'
    },
    imagename:{
        type:String,
        require:'description is required'
    },
    description:{
        type:String,
        require:'description is required'
    },
    Publisher:{
        type:String,
        require:'pulisher cannot be empty'
    },
    type:{
        type:String,
        require:'Type is required'
    },
    price:{
        type:Number,
        require:'price is required'
    },
    inserteddate:{
        type:Number,
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
 module.exports=mongoose.model('Upcominbooks',Upcomingbooks);