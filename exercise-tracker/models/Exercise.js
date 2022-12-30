const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: String,
  },
  _id: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
