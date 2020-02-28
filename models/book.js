var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    department: String,
},{
  timestamps: true
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;