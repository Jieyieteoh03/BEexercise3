const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//setup a middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//routes
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");
const newreviewRouter = require("./routes/review");

app.use("/movie", movieRouter);
app.use("/tvshow", tvshowRouter);
app.use("/reviews", newreviewRouter);

app.get("/", (req, res) => {
  res.send("<a href='/movies'>Movies</a><a href='/tvshows'>Tvshow</a>");
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});
