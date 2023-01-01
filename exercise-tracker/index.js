const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Exercise = require("./models/Exercise");
const Log = require("./models/Log");

const { createUser, getUser } = require("./controllers/user");
const { getLog } = require("./controllers/log");
const { createExercise } = require("./controllers/exercise");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected !"))
  .catch((err) => console.log(err));

// POST to create a new user
app.post("/api/users", createUser);

// GET to get all users
app.get("/api/users", getUser);

// POST exercise information
app.post("/api/users/:_id/exercises", createExercise);

// GET request to retrieve full exercise log
app.get("/api/users/:_id/logs", getLog);

app.listen(process.env.PORT, () => {
  console.log("Backend is running !");
});
