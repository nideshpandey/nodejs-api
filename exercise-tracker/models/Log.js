const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
  _id: {
    type: String,
  },
  log: {
    type: [
      {
        description: { type: String },
        duration: { type: Number },
        date: { type: Date },
      },
    ],
  },
});

module.exports = mongoose.model("Log", LogSchema);
