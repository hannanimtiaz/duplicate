var BookModel = require('../models/book')

exports.index = function (req, res, next) {
    res.render('home');
}


exports.getAddBooks = function (req, res) {
    res.render('addBooks');
}

exports.postAddBooks = async function (req, res) {
    var { title, author, department } = req.body

    let book = await BookModel.create({
        title,
        author,
        department
    })

    res.json({
        status: 'success',
        msg: 'Successfully created program',
        data: book
    });
}



exports.getViewBooks =async function (req, res){
    var docs = await BookModel.find({})

    res.render('viewBooks', {docs});
} 