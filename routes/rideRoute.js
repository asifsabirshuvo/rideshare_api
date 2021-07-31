const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const rideService = require('./../service/rideService');
const { check, validationResult } = require("express-validator"); //to validate form

router.post("/", [check("origin").not().isEmpty(),
        check("destination").not().isEmpty(),
        check("userPhone").not().isEmpty(),
        check("vehicleCode").notEmpty().isString(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await rideService.createRide(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);

module.exports = router;