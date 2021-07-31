const express = require('express');
const app = express();
const { mongoose } = require('./db/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const vehicleRoute = require('./routes/vehicleRoute');
const rideRoute = require('./routes/rideRoute');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//home router
app.get('/api/v1/health', (req, res) => {
    res.send('hello from rideshare API!!');
});

app.use('/api/v1/user/', userRoute);
app.use('/api/v1/vehicle/', vehicleRoute);
app.use('/api/v1/ride/', rideRoute);

//default error routers
app.use((req, res) => {
    res.status(404).send('404 route not found!');
});

app.listen(4000, () => {
    console.log('server running on 4000 PORT');
});

module.exports = { app };