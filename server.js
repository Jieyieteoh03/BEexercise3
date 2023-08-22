const express = require("express");
const mongoose = require("mongoose");

const app = express();

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//routes
const movieRouter = require("./routes/movie");

app.use("/movies", movieRouter);

const tvshowRouter = require("./routes/tvshow");

app.use("/tvshows", tvshowRouter);

app.get("/", (req, res) => {
  res.send("<a href='/movies'>Movies</a><a href='/tvshows'>Tvshow</a>");
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});
