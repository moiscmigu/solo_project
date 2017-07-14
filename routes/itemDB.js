var mongoose = require ('mongoose');



mongoose.connect ('localhost:27017/rentRegister');



var itemSchema = new mongoose.Schema({
    itemName:String,
    rentDay: Number,
    rentWeek: Number,
    rentMonth:Number,
    email: String,
    phone: Number,
    description: String,
    zipcode:Number,
    state:String,
    city:String,
    image:String
});

var itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel;
