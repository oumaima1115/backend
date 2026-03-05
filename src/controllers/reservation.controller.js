const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find()
    .populate("user")
    .populate("table");

  res.json(reservations);
};