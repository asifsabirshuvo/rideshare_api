const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//phone is the auth identity
const userSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);