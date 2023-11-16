const mongoose = require("mongoose")
const { Schema } = mongoose

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

// Create a model based on the schema
const Todo = new mongoose.model("Todo", todoSchema)

module.exports = Todo
