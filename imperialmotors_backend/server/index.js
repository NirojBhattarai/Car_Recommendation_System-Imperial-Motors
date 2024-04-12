const express = require("express");
const cors = require("cors");
const carsRouter = require('./routes/cars');
const recommendCarsRouter = require('./routes/recommendcar');


// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/addcar", require('./routes/addcar'));
app.use('/api/cars', carsRouter);
app.use('/api/recommendcars',recommendCarsRouter);

// Starting the server
app.listen(5000, () => {
    console.log('Server has started in port 5000');
});
