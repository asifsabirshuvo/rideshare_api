const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { createVehicleValidator } = require('./../validators/createVehicleValidator');
const vehicleService = require('./../service/vehicleService');
const { check, validationResult } = require("express-validator"); //to validate form

router.post("/", createVehicleValidator,
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