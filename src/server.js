require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const tableRoutes = require('./routes/table.routes');
const reservationRoutes = require('./routes/reservation.routes');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());//express.json() allows sending JSON data

app.use('/api/users', userRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
