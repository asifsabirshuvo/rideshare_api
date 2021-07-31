const mongoose = require("mongoose"); //mongodb said to use it for stopping findandupdate warnings IDK
require("dotenv").config();
mongoose.set("useFindAndModify", false);
mongoose.connect(
    process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.error(err);
        else console.log("Connected to the mongodb!");
    }
);

module.exports = { mongoose };