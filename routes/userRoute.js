const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userService = require('./../service/userService');
const { check, validationResult } = require("express-validator"); //to validate form

router.post("/", [check("name").not().isEmpty(),
        check("address").not().isEmpty(),
        check("phone").not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await userService.createUser(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });
        }
    }
);

module.exports = router;