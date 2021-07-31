const momentTz = require("moment-timezone");
const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const Ride = require("../models/ride");
const uniqid = require('uniqid');

async function createRide(body) {

    body.createdAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    body.updatedAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    //check for existing
    const existingUser = await User.findOne({ phone: body.userPhone });

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

    //does this vehicle have running ride already
    const activeRide = await Ride.findOne({ driver: existingUser.id, rideStatus: 1, vehicleCode: body.vehicleCode });
    if (activeRide) {
        return {
            status: 400,
            success: false,
            message: 'You already have an active ride for this vehicle',
        };
    }
    //Users can only offer a ride for a given vehicle, once there are no active offered rides for that 
    const routeAvailability = await Ride.findOne({ rideStatus: 1, origin: body.origin, destination: body.destination });
    if (routeAvailability) {
        return {
            status: 400,
            success: false,
            message: 'This origin destination have already active ride offers.',
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
async function findRides(reqFilters) {


    const {
        origin,
        destination,
        userPhone,
        preferredVehicle,
        mostVacant,
        page,
        limit
    } = reqFilters;

    /*
    DUE TO TIME CONSTRAINTS
    we are skipping wherether this is user 
    is valid or invalid
    or currently sitting in a ride
    */

    let query = {};
    query.skip = limit * (page - 1);
    query.limit = limit;
    let whereQuery = {
        origin: origin,
        destination: destination,
        rideStatus: 1,
    };
    if (preferredVehicle) {
        whereQuery.vehicleType = preferredVehicle;
    }
    if (mostVacant) {
        query.sort = { "availableSeats": -1 };
    }

    try {
        const data = await Ride.find(whereQuery, { _id: 0, __v: 0 }, query);

        return {
            status: 200,
            success: true,
            message: data,
        };
    } catch (err) {
        return {
            status: 400,
            success: false,
            message: 'failed to find from the database',
        };
    }
}
async function requestRide(request) {
    //SKIPPED IF THE USER IS ALREADY IN THIS RIDE
    const { userPhone, rideCode, seatQuantity } = request;
    const traveller = await User.findOne({ phone: userPhone });
    const ride = await Ride.findOne({ rideCode: rideCode });
    const currentSeats = ride.availableSeats;
    if (currentSeats < parseInt(seatQuantity)) {
        return {
            status: 404,
            success: false,
            message: 'Seats unavailable.',
        };
    }
    await Ride.updateOne({ rideCode: rideCode }, {
        $push: {
            travellers: traveller.id,
        },
        availableSeats: currentSeats - 1
    });
    return {
        status: 201,
        success: true,
        message: 'Successfully enrolled to ride.',
    };

}
async function endRide(request) {

    const { rideCode, userPhone } = request;
    const user = await User.findOne({ phone: parseInt(userPhone) });
    const endedRide = await Ride.updateOne({ rideCode: rideCode, driver: user.id }, {
        rideStatus: 0
    });
    if (endedRide.nModified) {
        return {
            status: 200,
            success: true,
            message: 'Successfully ended the ride.',
        };
    } else {
        return {
            status: 400,
            success: true,
            message: 'Failed to end the ride.',
        };
    }
}
async function rideStats() {

    //SORRY COULDNT DO DUE TO TIME CONSTRAINTS



    // Ride.findOne({ _id: req.params.id })
    //     .populate({
    //         path: "dddriver",
    //         model: "user",
    //     })
}

module.exports = {
    createRide,
    findRides,
    requestRide,
    endRide,
    rideStats
};