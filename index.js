const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

// // Middlewares are functions that are executed when routes are being hit

// app.use("/posts", (req, res, next) => {
//   console.log("This is a middleware running!");
//   next();
// });

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes
const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Hello home!");
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db!");
  }
);

// Let's listen to the server

const PORT = process.env.PORT || 3000;

app.listen(PORT);
