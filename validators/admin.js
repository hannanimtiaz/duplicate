const { body, validationResult, oneOf, check } = require('express-validator');

const { ifErrors } = require('./helper');

exports.userSignup = [
    body('noid').exists().custom(async value => {
        let userDoc = await Helper.checkIfNoIdAlreadyExistsAsync(value);
        if (userDoc)
            return Promise.reject('Noid already exists. User cannot be created');
    }),
    body('email').isEmail().custom(async value => {
        let userDoc = await Helper.emailAlreadyExistsAsync(value)
        if (userDoc)
            return Promise.reject('Email already exists. Please use different email');
    }),
    body('phone').exists().custom(async value => {
        let userDoc = await Helper.phoneAlreadyExistsAsync(value)
        if (userDoc)
            return Promise.reject('Phone already exists. Please use different phone');
    }),

    ifErrors
]