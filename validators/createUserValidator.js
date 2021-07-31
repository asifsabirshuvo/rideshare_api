const { check } = require('express-validator');

const createUserValidator = [
    [check("name").not().isEmpty(),
        check("address").not().isEmpty(),
        check("phone").not().isEmpty(),
    ]
];

module.exports = {
    createUserValidator,
};