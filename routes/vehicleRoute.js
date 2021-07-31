const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const vehicleService = require('./../service/vehicleService');
const { check, validationResult } = require("express-validator"); //to validate form

router.post("/", [check("name").not().isEmpty(),
        check("description").not().isEmpty(),
        check("defaultSeats").not().isEmpty(),
        check("vehicleType").not().isEmpty(),
        check("userPhone").not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await vehicleService.createVehicle(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);

module.exports = router;