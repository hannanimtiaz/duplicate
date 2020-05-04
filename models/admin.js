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

Admin.find({}).then(function (docs) {
  if (docs.length === 0) {
    Admin.create({ email: 'admin@email.com', password: '12345' });
  }
});