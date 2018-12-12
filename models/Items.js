const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Items = new schema({
    name:{
        type:String,
        require:[true,'Name field is required']
    },
    date:{
        type:Date,
        require:[true,'date field is required']
    },
});

const Itemtypes = mongoose.model('Items',Items);//'details' is mongodb name Details is the schema name;
module.exports=Itemtypes;