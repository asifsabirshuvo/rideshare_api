const momentTz = require("moment-timezone");
const Vehicle = require("../models/vehicle");
const User = require("../models/user");
const uniqid = require('uniqid');

async function createVehicle(body) {

    body.createdAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    body.updatedAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');

    console.log('finding user');

    const user = await User.findOne({ phone: body.userPhone });
    console.log(user);
    if (user == null) {
        return {
            status: 404,
            success: false,
            message: 'Could not find the user',
        };
    }
    if (user == null) {
        return {
            status: 404,
            success: false,
            message: 'Could not find the user',
        };
    }
    const existingVehicle = await Vehicle.findOne({ name: body.name, ownerId: user.id });
    if (existingVehicle) {
        return {
            status: 400,
            success: false,
            message: 'This user has this vehicle already',
        };
    }
    body.ownerId = user.id;
    body.vehicleCode = uniqid();
    const vehicle = new Vehicle(body);
    try {
        await vehicle.save();
        return {
            status: 201,
            success: true,
            message: 'successfully added vehicle!',
        };
    } catch (err) {
        return {
            status: 400,
            success: false,
            message: 'failed to insert into the database',
        };
    }

}

module.exports = { createVehicle };