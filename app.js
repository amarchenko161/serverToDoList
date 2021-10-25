const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const Schema = mongoose.Schema;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean,
});

app.use(cors());

const Task = mongoose.model("tasks", taskScheme);
const uri =
  "mongodb+srv://todoDB:restart987@cluster0.lnnws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get("/allTasks", (req, res) => {
  Task.find().then((result) => {
    res.send({ data: result });
  });
});

app.post("/createTask", (req, res) => {
  const task = new Task(req.body);
  task.save().then((result) => {
    res.send("Task created");
  });
});

app.delete("/deleteTask", (req, res) => {
  Task.deleteOne({ _id: req.query._id }).then((result) => {
    Task.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.patch("/updateTask", (req, res) => {
  Task.updateOne({ _id: req.query._id }, req.body).then((result) => {
    Task.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
