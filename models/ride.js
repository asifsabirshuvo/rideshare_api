const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    rideCode: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    driver: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    rideStatus: {
        type: Number,
        required: true
    },
    vehicleCode: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model("Ride", rideSchema);