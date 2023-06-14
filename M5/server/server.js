const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const {
  getAllProperties,
  addProperty,
} = require("./controllers/propertySearchController");
const {
  createApplication,
  getAllApplications,
} = require("./controllers/applicationController");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  // .connect("mongodb://127.0.0.1:27017/metro?") //=====> This is for local
  .connect("mongodb://mongo:27017/metro?") // ===> This is for the docker containers
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server running server on port 4000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/properties", getAllProperties);

app.use("/api/addproperty", addProperty);

app.use("/api/application", createApplication);

app.use("/api/application", getAllApplications);
