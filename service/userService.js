const momentTz = require("moment-timezone");
const User = require("../models/user");

async function createUser(body) {

    body.createdAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    body.updatedAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    //check for existing
    const existingUser = await User.findOne({ phone: body.phone });
    if (existingUser) {
        return {
            status: 200,
            success: false,
            message: 'User is already registered',
        };
    }
    const user = new User(body);
    try {
        await user.save();
        return {
            status: 201,
            success: true,
            message: 'successfully registered!',
        };
    } catch (err) {
        return {
            status: 400,
            success: false,
            message: 'failed to insert into the database',
        };
    }
}

module.exports = { createUser };