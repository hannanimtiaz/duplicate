var BookModel = require('../models/book')

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
    bookID = req.params.bookID
    console.log('bookID: ', bookID);
    book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);

    res.render('updatePage', { book: book });
}

exports.issueBook = async function (req, res) {
    var bookID = req.body.bookID
    console.log('bookID: ', bookID);
    book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);
    if (book) {
        console.log('book.current: ', book.current);
        if (book.current > 0) {
            book.current = book.current - 1;
            let current = book.current
            book.save()
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
    var bookID = req.body.bookID
    console.log('bookID: ', bookID);
    book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);
    if (book) {
        console.log('book.current: ', book.current);
        if (book.current < book.quantity) {
            book.current = book.current + 1;
            let current = book.current
            book.save()
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