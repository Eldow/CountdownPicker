//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: String,
    people: [String],
    createdAt: { type: Date, default: new Date() },
    owner: { name: { type: String }, userId: { type: String } },
});

module.exports = mongoose.model('Group', GroupSchema );
