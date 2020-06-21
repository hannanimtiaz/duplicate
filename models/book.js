var mongoose = require('mongoose');
const { schema } = require('./issue');

var BookHooks = require('./hooks/book')

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

bookSchema.pre('remove',BookHooks.removeBook)

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;