var mongoose = require('mongoose');
require('dotenv').config();


var uri= process.env.MONGO_DB_CONNECTION
// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect(uri);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
	age: Number
    });

// export userSchema as a class called User
module.exports = mongoose.model('User', userSchema);

userSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}