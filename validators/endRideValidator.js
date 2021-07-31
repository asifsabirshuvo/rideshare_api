const { check } = require('express-validator');

const endRideValidator = [check("rideCode").not().isEmpty(),
    check("userPhone").not().isEmpty(),
    check("rideCode").not().isEmpty(),
];

module.exports = {
    endRideValidator,
};