const momentTz = require("moment-timezone");
const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const Ride = require("../models/ride");
const uniqid = require('uniqid');

async function createRide(body) {

    body.createdAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    body.updatedAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    //check for existing
    console.log('---camere herere');

    console.log();
    const existingUser = await User.findOne({ phone: body.userPhone });
    console.log(existingUser);

    if (existingUser == null) {
        return {
            status: 404,
            success: false,
            message: 'This user does not exit',
        };
    }


    //now search for vehicle
    const existingVehicle = await Vehicle.findOne({
        ownerId: Object(existingUser.id),
        vehicleCode: body.vehicleCode,
    });
    console.log(existingVehicle);

    //does this have running ride already
    const activeRide = await Ride.findOne({ driver: existingUser.id, rideStatus: 1, vehicleCode: body.vehicleCode });
    if (activeRide) {
        return {
            status: 400,
            success: false,
            message: 'You already have an active ride for this vehicle',
        };
    }

    const newRide = {
        rideCode: uniqid(),
        origin: body.origin,
        destination: body.destination,
        driver: existingUser.id,
        availableSeats: existingVehicle.defaultSeats,
        rideStatus: 1,
        vehicleCode: body.vehicleCode,
        vehicleType: existingVehicle.vehicleType
    };

    console.log('-----------new ride data');
    console.log(newRide);

    const ride = new Ride(newRide);

    //lets create a ride
    try {
        await ride.save();
        return {
            status: 201,
            success: true,
            message: 'successfully ride started!',
        };
    } catch (err) {
        return {
            status: 400,
            success: false,
            message: 'failed to insert into the database',
        };
    }
}

module.exports = { createRide };