const mongoose= require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('usecreateIndexes',true);

const Purchase= new Schema({
    Name:{
        type:String,
        require:'Customer field cant be empty',
       
    },
    Items:{
        type:String,
        require:'Item field is required'

    },
    Date:{
        type:String,
        require:'date is required'
    },
    Amount:{
        type:Number,
        require:'Amount field is required'

    },
    isValid:{
        type:Boolean,
        default:false

    }
  

});
 module.exports=mongoose.model('Purchase',Purchase);