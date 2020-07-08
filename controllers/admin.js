var BookModel = require('../models/book')
var IssueModel = require('../models/issue')
var DepartmentModel = require('../models/depertment')
const moment = require('moment-timezone');

exports.index = function (req, res, next) {
    console.log("rendering index");
    res.render('home');
}


exports.getAddBooks = async function (req, res) {
    var departments = await DepartmentModel.find({})
    res.render('addBooks', { departments });
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
    var docs = await BookModel.find({}).populate('department')

    res.render('viewBooks', { docs });
}

exports.getUpdateBooks = async function (req, res) {
    var docs = await BookModel.find({}).populate('department')

    res.render('updateBooks', { docs });
}

exports.getUpdatePage = async function (req, res) {
    let bookID = req.params.bookID

    book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);
    let departments = await DepartmentModel.find({})

    res.render('updatePage', { book: book, departments });
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
    var issues = await IssueModel.find({}).populate({
        path: 'book_id',
        model: 'Book',
        populate: {
            path: 'department',
            model: 'Department'
        }
    })

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
    let books = await BookModel.find({}).populate('department')

    res.render('removeBook', { docs: books });
}


exports.removeBookPost = async function (req, res) {
    let bookID = req.body.bookID

    console.log('bookID: ', bookID);
    let book = await BookModel.findOne({ _id: bookID })
    console.log('book: ', book);

    if (book) {
        book.remove()
        res.json({
            status: 'success',
            msg: 'Successfully Deleted',
        });
    }
    else {
        res.json({
            status: 'failed',
            msg: 'Book does not exist',
        });
    }
}

exports.updateBook = async function (req, res) {
    let { bookID, quantity, title, author, department } = req.body

    let book = await BookModel.findById(bookID)

    if (book) {

        if (department) {

            book.quantity = quantity
            book.title = title
            book.author = author
            book.department = department
            book.save()
            res.json({
                status: 'success',
                msg: 'Successfully Updated',
            });
        } else {
            res.json({
                status: 'failed',
                msg: 'No Department Selected',
            });
        }
    }
    else {
        res.json({
            status: 'failed',
            msg: 'Book does not exist',
        });
    }
}

exports.addDepartmentGet = async function (req, res) {
    res.render('createDepartment');
}

exports.addDepartmentPost = async function (req, res) {
    var { name, info } = req.body

    let department = await DepartmentModel.create({
        name,
        info
    })

    res.json({
        status: 'success',
        msg: 'Successfully created Department',
        data: department
    });
}

exports.editDepartmentListGet = async function (req, res) {
    console.log('editDepartmentListGet: ');
    let departments = await DepartmentModel.find({})
    res.render('editDepartmentList', { docs: departments });
}

exports.editDepartmentGet = async function (req, res) {
    let departmentID = req.params.departmentID

    let department = await DepartmentModel.findOne({ _id: departmentID })

    res.render('editDepartment', { doc: department });
}


exports.editDepartmentPost = async function (req, res) {
    var { name, info,departementID } = req.body

    let department = await DepartmentModel.findById(departementID)
    if(department){
        department.name = name
        department.info = info
        department.save()
    }else{
        res.json({
            status: 'failed',
            msg: 'Department does not exist',
        });
    }

    res.json({
        status: 'success',
        msg: 'Successfully created Department',
        data: department
    });
}