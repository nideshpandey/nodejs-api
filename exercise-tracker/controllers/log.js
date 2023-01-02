const Log = require("../models/Log");
const Exercise = require("../models/Exercise");

const getLog = async (req, res) => {
  const id = req.params._id;
  //console.log(id);
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
      console.log(updateLog);
      res.json(updateLog);
    } else {
      console.log("No exercises saved until now");
      res.json("No exercises saved until no");
    }

    // if (temp) {
    //   let log = await Log.findOne({ user: id });
    //   console.log(log);

    //   if (log) {
    //     let tempArr = [];
    //     temp.map((item) => {
    //       tempArr.push({
    //         description: item.description,
    //         duration: item.duration,
    //         date: item.date,
    //       });
    //       //console.log(item.description, item.duration, item.date);
    //     });

    //     let log = await Log.findOneAndUpdate({
    //       count: tempArr.length,
    //       log: tempArr,
    //     });
    //     res.json(log);
    //   } else {
    //     let tempArr = [];
    //     temp.map((item) => {
    //       tempArr.push({
    //         description: item.description,
    //         duration: item.duration,
    //         date: item.date,
    //       });
    //       //console.log(item.description, item.duration, item.date);
    //     });

    //     const log = new Log({
    //       user: id,
    //       count: temp.length,
    //       log: tempArr,
    //     });
    //     await log.save();
    //     res.json(log);
    //   }
    // } else {
    //   console.log("No exercises saved until now");
    //   res.json("No exercises saved until no");
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error !");
  }
};

module.exports = { getLog };
