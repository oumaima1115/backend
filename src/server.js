require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const tableRoutes = require('./routes/table.routes');
const reservationRoutes = require('./routes/reservation.routes');
const mongoose = require("mongoose");
const app = express();

app.use(express.json());//express.json() allows sending JSON data
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.error(err));

// Dynamic port for deployment
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
