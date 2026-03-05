const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(\+\d{1,3}\s?)?\d{8,15}$/.test(value);
      },
      message: "Invalid phone number format"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model("User", userSchema);