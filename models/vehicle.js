const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    ownerId: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    vehicleCode: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['Activa', 'Polo', 'XUV'],
        default: 'Activa',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    defaultSeats: {
        type: Number,
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

module.exports = mongoose.model("Vehicle", vehicleSchema);