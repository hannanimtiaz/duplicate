const { body, validationResult, oneOf, check } = require('express-validator');
const { ifErrors } = require('./helper');
const AdminModel = require('../models/admin')


exports.adminUpdate = [
    check('password').exists().withMessage('Details must be entered'),
    check('email').exists().customSanitizer(val => val.toLowerCase()).custom(async (val, { req }) => {
        if (await emailExists(val, req.session._id)) {
            return Promise.reject('Email already exists');
        }
    }),
    ifErrors
]
async function emailExists(value, id) {
    let admin = await AdminModel.findOne({ email: value.toLowerCase()})
    console.log('admin: ', admin);
    if (admin) {
        console.log('admin._id: ', admin._id);
        console.log('id: ', id);
        if (admin._id == id)
            return false
        else
            return true
    }
    else
        return false
}