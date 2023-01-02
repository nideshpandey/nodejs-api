const Log = require("../models/Log");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

const getLog = async (req, res) => {
  const id = req.params._id;
  const { from, to, limit } = req.query;
  console.log(from, to, limit);

  console.log(Object.keys(req.query).length);
  //console.log(id);
  if (Object.keys(req.query).length !== 0) {
    try {
      let selectedLog = await Log.findOne({ user: id });
      let { username } = await User.findOne({ _id: id });
      //   .where(new Date("log['date']").toString())
      //   .gte(new Date(from).toString())
      //   .lte(new Date(to).toString());

      let dates = selectedLog.log.filter((item) => {
        console.log(typeof new Date(item.date), new Date(from), new Date(to));
        return (
          new Date(item.date).setHours(0, 0, 0, 0) >=
            new Date(from).setHours(0, 0, 0, 0) &&
          new Date(item.date).setHours(0, 0, 0, 0) <=
            new Date(to).setHours(0, 0, 0, 0)
        );
      });

      const sortedDates = dates.sort((a, b) => b.date - a.date);

      //console.log("Here are dates");

      //console.log(dates);
      let resObj = {
        username: username,
        count: selectedLog.count,
        _id: id,
        log: sortedDates.slice(0, Number(limit)),
      };

      console.log(resObj);

      res.json(resObj);
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error !");
    }
  } else {
    try {
      const temp = await Exercise.find({ user: id });
      //console.log(temp);
      let tempArr = [];
      temp.map((item) => {
        tempArr.push({
          description: item.description,
          duration: item.duration,
          date: item.date,
        });
        //console.log(item.description, item.duration, item.date);
      });
      //console.log(tempArr);

      filter = { user: id };
      update = { count: tempArr.length, log: tempArr };
      options = { upsert: true, new: true };

      if (temp) {
        let updateLog = await Log.findOneAndUpdate(filter, update, options);
        //console.log(updateLog);
        res.json(updateLog);
      } else {
        console.log("No exercises saved until now");
        res.json("No exercises saved until no");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error !");
    }
  }
};

module.exports = { getLog };
