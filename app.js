const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
_ = require("lodash");
const Schema = mongoose.Schema;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean,
});

app.use(cors());

const Task = mongoose.model("tasks", taskScheme);
const uri = "mongodb+srv://todoDB:restart987@cluster0.lnnws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.get("/allTasks", (req, res) => {
  Task.find().then((result) => {
    res.send({ data: result });
  });
});

app.post("/createTask", (req, res) => {
  if (req.body.hasOwnProperty("text") && req.body.hasOwnProperty("isCheck")) {
    const task = new Task(req.body);
    task.save().then((result) => {
      res.send("Task created");
    });
  } else {
    res.status(404).send("Error");
  }
});

app.delete("/deleteTask", (req, res) => {
  if (req.query._id) {
    Task.deleteOne({ _id: req.query._id }).then((result) => {
      Task.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(404).send("Error");
  }
});

app.patch("/updateTask", (req, res) => {
  if (req.query._id) {
    if (req.body.hasOwnProperty("text") && req.body.hasOwnProperty("isCheck")) {
      Task.updateOne({ _id: req.query._id }, req.body).then((result) => {
        Task.find().then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(404).send("Error");
    }
  } else {
    res.status(404).send("Error");
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
