const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  count: {
    type: Number,
  },
  log: {
    type: Array,
  },
});

module.exports = mongoose.model("Log", LogSchema);
