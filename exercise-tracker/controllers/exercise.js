const Exercise = require("../models/Exercise");
const User = require("../models/User");

const createExercise = async (req, res) => {
  const id = req.params._id;
  //console.log(id);

  try {
    let user = await User.findOne({ _id: id });
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
        user: id,
        description,
        duration,
        date: new_date,
      });

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
      console.log(err);
      res.json("Invalid Id !");
    } else {
      console.log(err);
      res.status(500).json("Server Error !");
    }
  }
};

module.exports = { createExercise };
