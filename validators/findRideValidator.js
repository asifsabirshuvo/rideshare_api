const { check, query } = require('express-validator');

const findRideValidator = [check("origin").not().isEmpty(),
    query("origin").not().isEmpty(),
    query("destination").not().isEmpty(),
    query("userPhone").notEmpty().isString(),
];

module.exports = {
    findRideValidator,
};