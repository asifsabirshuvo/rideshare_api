const { check } = require('express-validator');

const createRideValidator = [check("origin").not().isEmpty(),
    check("destination").not().isEmpty(),
    check("userPhone").not().isEmpty(),
    check("vehicleCode").notEmpty().isString(),
];

module.exports = {
    createRideValidator,
};