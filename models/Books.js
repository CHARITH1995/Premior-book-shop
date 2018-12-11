const mongoose= require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('usecreateIndexes',true);

const Books= new Schema({
    name:{
        type:String,
        require:'name field cant be empty',
        unique:true
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
    Status:{
        type:String,
        default:"unsold"
    }

});
 module.exports=mongoose.model('Books',Books);