var mongoose = require ('mongoose');

mongoose.connect ("mongodb://heroku_09wjnwq1:bvnvj00llce5c8j1oe1psjd3hi@ds161640.mlab.com:61640/heroku_09wjnwq1");

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
