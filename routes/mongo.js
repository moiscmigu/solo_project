var mongoose = require ('mongoose');

mongoose.connect ("mongodb://heroku_p2n5vtds:uuma40pb6rpu2iun9hggo6c5u1@ds113000.mlab.com:13000/heroku_p2n5vtds");

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
