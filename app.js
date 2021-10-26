const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
_ = require("lodash");

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const uri = "mongodb+srv://todoDB:restart987@cluster0.lnnws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
