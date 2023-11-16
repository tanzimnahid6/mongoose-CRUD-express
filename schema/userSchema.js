const mongoose = require("mongoose")
const { Schema } = mongoose
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
})
const user = new mongoose.model("User", userSchema)
module.exports = user
