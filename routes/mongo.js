var mongoose = require ('mongoose');

mongoose.connect (process.env.MONGODB_URL);

var userSchema = new mongoose.Schema({
  firstName:String,
  lastName: String,
  email:String,
  zipcode: Number,
  password: String,
  state:String,
  city:String,
  phone:Number,
  image:String
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
