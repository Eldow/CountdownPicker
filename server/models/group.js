//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: String,
    people: [String],
});

module.exports = mongoose.model('Group', GroupSchema );
