const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  credits: {
    type: Number,
    default: 100,
    min: 0
  },
  isCreditAvailable: {
    type: Boolean,
    default: true
  },
  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Notes",
    default: []
  }
}, { timestamps: true });

// hash password before saving
userSchema.pre('save', async function () {
    if (!this.password) {
        return;
    }
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) {
        return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
