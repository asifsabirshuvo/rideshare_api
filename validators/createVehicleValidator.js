const { check } = require('express-validator');

const createVehicleValidator = [check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("defaultSeats").not().isEmpty(),
    check("vehicleType").not().isEmpty(),
    check("userPhone").not().isEmpty(),
];

module.exports = {
    createVehicleValidator,
};