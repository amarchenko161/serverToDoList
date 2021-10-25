const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Schema = mongoose.Schema;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
});

const uri = 'mongodb+srv://todoDB:restart987@cluster0.lnnws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const Task = mongoose.model("tasks", taskScheme); 

app.get('/', (req, res) => {
  const task = new Task({
    text: 'Second task',
    isCheck: false
  });
  task.save().then(result => {
    res.send(result);
  });
});

app.get('/paramRequest', (req,res) => {
  Task.find().then(result => {
    res.send({data: result});
  })
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

