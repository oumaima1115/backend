// tt les logique
const User = require("../models/User");

let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Sarah' }
];

exports.getAll = async(req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getOne = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};

// Create a user
exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

exports.update = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};

exports.remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
