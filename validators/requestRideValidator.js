const { check } = require('express-validator');

const requestRideValidator = [
    check("rideCode").not().isEmpty(),
    check("userPhone").not().isEmpty(),
    check("seatQuantity").not().isEmpty(),

];

module.exports = {
    requestRideValidator,
};