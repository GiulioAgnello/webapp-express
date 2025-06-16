// Import and config
const express = require("express");
require("dotenv").config();

// config app and kays
const app = express();
const port = process.env.APP_PORT;
const urlHost = process.env.APP_HOST;

// middleware
app.use(express.static("public"));
app.use(express.json());

// route
app.get("/", (req, res) => res.send("Movie Database!"));

// listening
app.listen(port, () =>
  console.log(`Example app listening at ${urlHost}${port}`)
);
