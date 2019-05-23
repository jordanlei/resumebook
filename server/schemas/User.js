var mongoose = require('mongoose');
require('dotenv').config();


var uri= process.env.MONGO_DB_CONNECTION
// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect(uri);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    year: Number,
    email: String,
    bio: String,
    funFact: String, 
    });

// export userSchema as a class called User
module.exports = mongoose.model('User', userSchema);

userSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}