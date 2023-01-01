const User = require("../models/User");

const createUser = async (req, res) => {
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
};

const getUser = async (req, res) => {
  User.find((error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
};

module.exports = { createUser, getUser };
