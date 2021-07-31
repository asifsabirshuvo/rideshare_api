const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const rideService = require('./../service/rideService');
const { check, validationResult } = require("express-validator"); //to validate form
const { query, queryValidationResult } = require("express-validator"); //to validate form

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

router.get("/", [check("origin").not().isEmpty(),
    query("origin").not().isEmpty(),
    query("destination").not().isEmpty(),
    query("userPhone").notEmpty().isString(),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array(),
        });
    } else {
        const origin = req.query.origin;
        const destination = req.query.destination;
        const userPhone = req.query.userPhone;
        const preferredVehicle = req.query.preferredVehicle;
        const mostVacant = req.query.mostVacant;
        const page = parseInt(req.query.page ? req.query.page : 1);
        const limit = parseInt(req.query.limit ? ((req.query.limit <= 10) ? req.query.limit : 10) : 10);
        const reqFilters = {
            origin,
            destination,
            userPhone,
            preferredVehicle,
            mostVacant,
            page,
            limit
        };
        const data = await rideService.findRides(reqFilters);
        return res.status(data.status).json({
            success: data.success,
            message: data.message
        });

    }

});

router.post("/request-ride", [check("rideCode").not().isEmpty(),
        check("userPhone").not().isEmpty(),
        check("seatQuantity").not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            if (parseInt(req.body.seatQuantity) > 2) {
                return res.status(400).json({
                    success: false,
                    message: 'maximum 2 seats requests are allowed'
                });
            }
            const data = await rideService.requestRide(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);


router.post("/end-ride", [check("rideCode").not().isEmpty(),
        check("userPhone").not().isEmpty(),
        check("rideCode").not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await rideService.endRide(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);
module.exports = router;