const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors({ optionsSuccessStatus: 200 }));

//To use static files like CSS
//app.use(express.static());

//First API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello !" });
});

app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;
  console.log(dateString);
  let date;

  //If no date is passed it returns back response as current time in JSON
  if (!dateString) {
    date = new Date();
  } else {
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  if (date.toString() == "Invalid Date") {
    res.json({ error: date.toString() });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
      iso: date.toISOString(),
      time: date.toTimeString(),
      extra: date.getTimezoneOffset(),
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Application is listening in port", process.env.PORT);
});
