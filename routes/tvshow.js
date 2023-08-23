const express = require("express");
const router = express.Router();

const Tvshow = require("../models/tvshow");

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
  res.send(await Tvshow.find(filter));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Tvshow.findOne({ _id: req.params.id });
  res.send(data);
});

router.post("/", async (req, res) => {
  const newTvshow = new Tvshow({
    title: req.body.title,
    creator: req.body.creator,
    premiere_year: req.body.premiere_year,
    end_year: req.body.end_year,
    seasons: req.body.seasons,
    genre: req.body.genre,
    rating: req.body.rating,
  });

  await newTvshow.save();
  res.send(newTvshow);
});

router.put("/:id", async (req, res) => {
  const tvshow_id = req.params.id;
  const updatedTvshow = await Tvshow.findByIdAndUpdate(tvshow_id, req.body, {
    new: true,
  });
  res.send(updatedTvshow);
});

router.delete("/:id", async (req, res) => {
  const tvshow_id = req.params.id;
  const deleteTvshow = await Tvshow.findByIdAndDelete(tvshow_id);
  res.send(deleteTvshow);
});

module.exports = router;
