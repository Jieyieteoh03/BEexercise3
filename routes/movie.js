const express = require("express");
const router = express.Router();

//import model into router
const movie = require("../models/movie");

// list all the movies
// router.get("/", async (req, res) => {
//   //promise method
//   // movie.find().then((moviesList) => {
//   //   res.send(moviesList);
//   // })
//   //async/await method
//   const moviesList = await movie.find();
//   res.send(moviesList);
// });

router.get("/", async (req, res) => {
  const { genre, rating, release_year } = req.query;
  let list = false;
  let filter = {};

  //old method
  // if (genre) {
  //   list = await movie.find({ genre: genre });
  // } else if (rating) {
  //   list = await movie.find({rating: { $gt: rating }});
  // } else if (release_year) {
  //   list = await movie.find({release_year: { $gt: release_year }});
  // } else {
  //   list = await movie.find();
  // }

  /* better filtering method */
  if (genre || rating || release_year) {
    if (genre) {
      filter.genre = genre; //{genre: genre}
    }
    if (rating) {
      filter.rating = { $gt: rating }; //{ $gt: rating }
    }
    if (release_year) {
      filter.release_year = { $gt: release_year }; //{ $gt: release_year }
    }
  }
  res.send(await movie.find(filter));
});

//get specific movie by id
/* 
  /movies/64e40e1bf0176bfb7721dafe
*/
router.get("/:id", async (req, res) => {
  const data = await movie.findOne({ _id: req.params.id });
  res.send(data);
});

module.exports = router;
