// Import and config
const express = require("express");
require("dotenv").config();
const movieRouter = require("./Routers/moviesRouter");
const handlerError = require("./middleware/hendolerror");
const errorFound = require("./middleware/errorfound");

// config app and kays
const app = express();
const port = process.env.APP_PORT;
const urlHost = process.env.APP_HOST;

// middleware
app.use(express.static("public"));
app.use(express.json());

// access all routers
app.use("/movie", movieRouter);

// error middleware
app.use(handlerError);
app.use(errorFound);

// listening
app.listen(port, () =>
  console.log(`Example app listening at ${urlHost}${port}`)
);
