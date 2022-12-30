const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Exercise = require("./models/Exercise");
const Log = require("./models/Log");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected !"))
  .catch((err) => console.log(err));

// POST to create a new user
app.post("/api/users", async (req, res) => {
  //console.log(req.body);
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      console.log("Usename found in database !");
      res.json(user);
    } else {
      user = new User({
        username,
      });

      await user.save();
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// GET to get all users
app.get("/api/users", async (req, res) => {
  User.find((error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// POST exercise information
app.post("/api/users/:_id/exercises", async (req, res) => {
  const _id = req.params._id;
  //console.log(_id);

  try {
    let user = await User.findOne({ _id });
    //console.log(user);

    if (user) {
      let { description, duration, date } = req.body;
      const { _id, username } = user;
      //console.log(_id, username);

      let new_date;

      if (date) {
        new_date = new Date(date).toDateString();
      } else {
        new_date = new Date().toDateString();
      }

      //console.log(new_date);

      const exercise = new Exercise({
        username: username,
        description,
        duration,
        date: new_date,
        _id: _id,
      });

      // let logDetail = await Log.findOne({ _id });
      // let logObj = {
      //   description,
      //   duration,
      //   date: new_date,
      // };

      // if (logDetail) {
      //   let countExercise = logDetail.count;
      //   let { log } = logDetail;
      //   const logs = new Log({
      //     username: username,
      //     count: countExercise++,
      //     _id: _id,
      //     log: log.append(logObj),
      //   });
      //   await logs.save();
      // } else {
      //   let { log } = logDetail;
      //   const logs = new Log({
      //     username: username,
      //     count: 1,
      //     _id: _id,
      //     log: log.append(logObj),
      //   });
      //   await logs.save();
      // }

      await exercise.save();

      res.json(exercise);
    } else {
      console.log("User not found. Create a user first");
      res.json("User not found. Create a user first");
    }
  } catch (err) {
    console.log(err.name);
    if ((err.name = "CastError")) {
      console.log("Id is invalid !");
      res.json("Invalid Id !");
    } else {
      console.log(err);
      res.status(500).json("Server Error !");
    }
  }
});

// GET request to retrieve full exercise log
app.get("/api/users/:_id/logs", async (req, res) => {
  const _id = req.params._id;
  console.log(_id);

  try {
    let user = await User.findOne({ _id });
    //console.log(log);
    if (user) {
      console.log("User Log Found !");
    } else {
      console.log("User not found !");
      res.json("User not Found");
    }
  } catch (err) {
    console.log(err.name);
    if ((err.name = "CastError")) {
      console.log("Id is invalid !");
      res.json("Invalid Id !");
    } else {
      console.log(err);
      res.status(500).json("Server Error !");
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log("Backend is running !");
});
