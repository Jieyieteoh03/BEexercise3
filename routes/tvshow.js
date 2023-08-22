const express = require("express");
const router = express.Router();

const tvshow = require("../models/tvshow");

router.get("/", async (req, res) => {
  const { genre, rating, premiere_year } = req.query;
  let filter = {};

  if (genre || rating || premiere_year) {
    if (genre) {
      filter.genre = { $in: genre.split(",") };
    }
    if (rating) {
      filter.rating = { $gt: rating };
    }
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year };
    }
  }
  res.send(await tvshow.find(filter));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await tvshow.findOne({ _id: req.params.id });
  res.send(data);
});

module.exports = router;
