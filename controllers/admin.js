var BookModel = require('../models/book')
var IssueModel = require('../models/issue')
const moment = require('moment-timezone');

exports.index = function (req, res, next) {
    console.log("rendering index");
    res.render('home');
}


exports.getAddBooks = function (req, res) {
    res.render('addBooks');
}

exports.postAddBooks = async function (req, res) {
    author = []
    var { title, author, department, quantity } = req.body
    console.log('quantity: ', quantity);
    console.log('department: ', department);
    console.log(' author: ', author);
    console.log('title: ', title);

    let book = await BookModel.create({
        title,
        author,
        department,
        quantity,
        current: quantity
    })
    console.log('book: ', book);

    res.json({
        status: 'success',
        msg: 'Successfully Added Books',
        data: book
    });
}



exports.getViewBooks = async function (req, res) {
    var docs = await BookModel.find({})

    res.render('viewBooks', { docs });
}

exports.getUpdateBooks = async function (req, res) {
    var docs = await BookModel.find({})

    res.render('updateBooks', { docs });
}

exports.getUpdatePage = async function (req, res) {
    let bookID = req.params.bookID
    console.log('bookID: ', bookID);
    book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);

    res.render('updatePage', { book: book });
}

exports.issueBook = async function (req, res) {
    var { bookID, name, phone_no, roll_no } = req.body
    console.log('bookID: ', bookID);
    let book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);
    if (book) {
        console.log('book.current: ', book.current);
        if (book.current > 0) {
            book.current = book.current - 1;
            let current = book.current
            book.save()
            today = moment().format('YYYY-MM-DD')
            returnDate = moment(today).add('days', 7).format('YYYY-MM-DD')
            IssueModel.create({
                'name': name,
                'roll_no': roll_no,
                'phone_number': phone_no,
                'book_id': bookID,
                'issueDate': today,
                'returnDate': returnDate
            })
            res.json({
                status: 'success',
                msg: 'Successfully Issued',
                current: current
            });
        }
        else {
            res.json({
                status: 'failed',
                msg: 'No books left',
            });
        }
    }
}


exports.returnBook = async function (req, res) {
    var issues = await IssueModel.find({}).populate('book_id')

    res.render('returnBook', { issues });
}

exports.returnBookPost = async function (req, res) {
    var issueID = req.body.issueID
    console.log('issueID: ', issueID);

    let issue = await IssueModel.findOne({ _id: issueID }).populate('book_id')
    console.log('issue: ', issue);
    if (issue) {
        console.log('book.current: ', issue.book_id.current);
        if (issue.book_id.current < issue.book_id.quantity) {
            issue.book_id.current = issue.book_id.current + 1;
            let current = issue.book_id.current
            issue.book_id.save()
            issue.remove()
            res.json({
                status: 'success',
                msg: 'Successfully Issued',
                current: current
            });
        }
        else {
            res.json({
                status: 'failed',
                msg: 'No Book Issued',
            });
        }
    }
}

exports.removeBookGet = async function (req, res) {
    let books = await BookModel.find({})

    res.render('removeBook',{docs:books});
}


exports.removeBookPost = async function (req, res) {
    let bookID = req.body.bookID

    console.log('bookID: ', bookID);
    let book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);

    if(book){
        book.remove()
        res.json({
            status: 'success',
            msg: 'Successfully Deleted',
        });
    }
    else{
        res.json({
            status: 'failed',
            msg: 'Book does not exist',
        });
    }
}