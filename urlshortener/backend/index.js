const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const validate = require("./util");
const Url = require("./model");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

//Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected !");
  })
  .catch((err) => {
    console.log(err);
  });

// Find all URL

app.get("/all", async (req, res) => {
  Url.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// API endpoint for shortening the URL
app.post("/shorturl", async (req, res) => {
  console.log(req.body.url);
  const { originalUrl } = req.body;

  console.log(originalUrl);

  //res.json({ url: originalUrl });
  const base = `http://localhost:3000`;

  const urlId = shortid.generate();
  if (validate.isValidUrl(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });

      if (url) {
        const { originalUrl, shortUrl } = url;
        console.log("Found in Database !");
        //res.json(url);
        res.json({ original_url: originalUrl, short_url: shortUrl });
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          originalUrl,
          shortUrl,
          urlId,
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error !");
    }
  } else {
    res.status(400).json("Invalid URL provided !");
  }
});

// Redirecting to original URL
app.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url);
    if (url) {
      //return res.redirect(url.originalUrl);
      res.json(url);
    } else {
      res.status(400).json("Website not found !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error !");
  }
});

// Running the application
app.listen(process.env.PORT, () => {
  console.log("Backend is running !");
});
