var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
},{
  timestamps: true
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;