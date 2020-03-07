var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: [{type:String}],
    department: String,
    quantity:Number,
    current:Number
},{
  timestamps: true
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;