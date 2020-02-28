const AdminModel = require('../models/admin');

module.exports.login = async function (req, res, next) {
    var {email, password} = req.body
    console.log('password: ', password);
    console.log('email: ', email);

    let admin = await AdminModel.findOne({});

    if (admin.email == email &&
        admin.password == password) {

        req.session.type = 'admin';
        req.session._id = admin._id;
        req.session.email = admin.email;
        req.session.firstname = admin.name;

        return res.json({
            status: 'success',
            msg: 'Successfully logged In',
            data: null,
            redirect: '/home'
        });

    } else {
        res.json({
            status: 'error',
            msg: 'Invalid email/password',
            data: null
        });
    }
}

module.exports.isAdmin = function (req, res, next) {
    if (req.session._id) {
        console.log(req.session._id);
        req.body.id = req.session._id;
        next();
    }
    else {
        // res.send('You are loggout');
        res.redirect('/');
    }
}