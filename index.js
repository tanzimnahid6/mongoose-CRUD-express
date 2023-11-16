const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./schema/todoSchema")
const User = require("./schema/userSchema")

const app = express()
app.use(express.json())
//connect mongodb
mongoose
  .connect(
    `mongodb+srv://tanzimnahid6:5CcK6vOasX7Dbcp1@cluster0.eocku8h.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connection successful ")
  })
  .catch((err) => {
    console.log(err)
  })

//===================posted data==========start
app.post("/todo", async (req, res) => {
  try {
    const newTodo = new Todo(req.body)
    const savedTodo = await newTodo.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    console.error("Error creating todo:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
//===================posted data==========end
//post data based on another schema model=======end
app.post("/user", async (req, res) => {
  try {
    const newUser = await User(req.body)
    await newUser.save()
    res.status(201).json({ Message: "New user inserted" })
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
//post data based on another schema model=======end

//GET:get single video===========================================start
app.get("/todo/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const newData = await Todo.findOne(filter)
  res.status(201).json({ Data: newData })
})
// Using callback

// app.get("/todo/:id", (req, res) => {
//   Todo.findOne({ _id: req.params.id }, (err, todo) => {
//     if (err) {
//       console.error("Error finding todo", err)
//       res.status(500).json({ error: "Internal Server Error" })
//     } else if (todo) {
//       res.json(todo)
//     } else {
//       res.status(404).json({ error: "Todo not found" })
//     }
//   })
// })
//GET:get single video============================end

//UPDATE:put method can change particular property=======================start

app.put("/todo/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  try {
    const updateData = await Todo.updateOne(filter, {
      $set: {
        completed: true,
        task: "No Task available now",
      },
    }).exec()

    if (updateData) {
      res.status(200).json(updateData)
    } else {
      res.status(404).json({ error: "Document not found" })
    }
  } catch (error) {
    console.error("Error updating todo", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
//UPDATE:put method can change particular property================start

//GET:get all collection=========================================start
app.get("/todo", async (req, res) => {
  try {
    const data = await Todo.find()
    if (data?.length > 0) {
      res.status(201).json(data)
    } else {
      res.status(201).json({ Message: "No todo found" })
    }
  } catch (error) {
    res.status(201).json({ Message: err })
  }
})
//GET:get all collection=========================================end

//Delete:Delete operation=======================================start
app.delete("/todo/:id", async (req, res) => {
  const filter = { _id: req.params.id }
  const deletedInfo = await Todo.deleteOne(filter)
  res.status(201).json(deletedInfo)
})
//Delete:Delete operation=======================================end

//countDocuments():find document length with query
app.get("/count", async (req, res) => {
  try {
    const count = await Todo.countDocuments({ completed: false })
    res.status(200).json({ count: count })
  } catch (error) {
    console.error("Error counting documents", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
