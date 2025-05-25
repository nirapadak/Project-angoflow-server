const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    max: 20,
    min: 6
  }

},
  {
    timestamps: true,
    versionKey: false,
  })

const User = mongoose.model("user", userSchema);
module.exports = User;