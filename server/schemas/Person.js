var mongoose = require('mongoose');
require('dotenv').config();

// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect(process.env.MONGO_DB_CONNECTION);

var Schema = mongoose.Schema;

var personSchema = new Schema({
	name: {type: String, required: true, unique: true},
	age: Number
    });

// export personSchema as a class called Person
module.exports = mongoose.model('Person', personSchema);

personSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}