const express = require("express");
const cors = require("cors");
const https = require("https");
require("dotenv").config();

const app = express();

// MIDDLEWARE
// CORS is used to test the API remotely. "Resource Sharing"
app.use(cors());

app.get("/api/whoami", (req, res) => {
  let ip = req.headers["x-forwarded-for"];
  let lang = req.headers["accept-language"];
  let soft = req.headers["user-agent"];
  console.log(req.headers);

  res.json({ ip_address: ip, language: lang, software: soft });
});

https.get("https://www.google.com/", (res) => {
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);
});

app.listen(process.env.PORT, () => {
  console.log("API is running !");
});
