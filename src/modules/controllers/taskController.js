const Task = require("../../db/models/task/index");

module.exports.getAllTasks = (req, res) => {
  Task.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNewTask = (req, res) => {
  if (req.body.hasOwnProperty("text") && req.body.hasOwnProperty("isCheck")) {
    const task = new Task(req.body);
    task.save().then((result) => {
      res.send("Task created");
    });
  } else {
    res.status(404).send("Error");
  }
};

module.exports.changeTaskInfo = (req, res) => {
  if (req.query._id) {
    if (req.body.hasOwnProperty("text") || req.body.hasOwnProperty("isCheck")) {
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
};

module.exports.deleteTask = (req, res) => {
  if (req.query._id) {
    Task.deleteOne({ _id: req.query._id }).then((result) => {
      Task.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(404).send("Error");
  }
};
