var mongoose = require ('mongoose');

mongoose.connect ("mongodb://heroku_ts08t06v:9q4c5or12a5c8c3oidb54j0rft@ds117839.mlab.com:17839/heroku_ts08t06v");

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
