// tt les logique
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
// to generate JWT_SECRET:
// open cmd
// wrote node
// then paste this line of code: require('crypto').randomBytes(64).toString('hex')
const { validateEmail } = require("../utils/validateUser");

let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Sarah' }
];

exports.getAll = async (req, res) => {
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

exports.signUp = async (req, res) => {
  try {
    const { email, password, name, phone, role } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });
    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    );

    res.json({ message: "Sign in successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const revokedTokens = new Set();
exports.logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  revokedTokens.add(token); // add token to blacklist
  console.log('revokedTokens = ', revokedTokens);
  res.json({ message: "Logout successful" });
};
