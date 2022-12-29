const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Exercise = require("./models/Exercise");

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
  const id = req.params._id;
  //console.log(id);

  let user = await User.findOne({ id });
  console.log(user);
  res.json("Ok");

  //   try {
  //     let user = await User.findById({ _id: req.params._id });
  //     //console.log(user);

  //     if (user) {
  //       let { description, duration, date } = req.body;
  //       const { _id, username } = user;
  //       console.log(_id, username);

  //       let new_date;

  //       if (date) {
  //         date = new Date(date).toDateString();
  //       } else {
  //         date = new Date().toDateString();
  //       }

  //       const exercise = new Exercise({
  //         username,
  //         description,
  //         duration,
  //         date,
  //       });

  //       await exercise.save();
  //       res.json(exercise);
  //     } else {
  //       console.log("User not found. Create a user first");
  //       res.json("User not found. Create a user first");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json("Server Error !");
  //   }
});

app.listen(process.env.PORT, () => {
  console.log("Backend is running !");
});
