const express = require("express");
const router = express.Router();

//import model into router
const Movie = require("../models/movie");

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
  try {
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
    res.status(200).send(await Movie.find(filter).sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

//get specific movie by id
/* 
  /movies/64e40e1bf0176bfb7721dafe
*/
router.get("/:id", async (req, res) => {
  try {
    const data = await Movie.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

//create new movie route
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    //create a placeholder for a new movie (Havent done anything, just putting it there)
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      release_year: req.body.release_year,
      genre: req.body.genre,
      rating: req.body.rating,
    });

    //save the new movie into mongodb
    await newMovie.save();
    res.status(200).send(newMovie);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

//update a movie
router.put("/:id", async (req, res) => {
  try {
    //get movie id
    const movie_id = req.params.id;
    //update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(movie_id, req.body, {
      new: true, //return the latest modified data
    });
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

//delete a movie
router.delete("/:id", async (req, res) => {
  try {
    //get movie id
    const movie_id = req.params.id;
    //delete the movie
    const deleteMovie = await Movie.findByIdAndDelete(movie_id);
    res.status(200).send(deleteMovie);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

//method 1
//post review
// router.post("/:id/reviews", async (req, res) => {
//   try {
//     //get movie id
//     const movie_id = req.params.id;
//     //find the movie
//     const movie = await Movie.findById(movie_id);
//     //create a new review and add it to the movie's review field
//     const newReview = {
//       username: req.body.username,
//       email: req.body.email,
//       content: req.body.content,
//       rating: req.body.rating,
//     };
//     movie.reviews.push(newReview);

//     //save the movie data
//     await movie.save();

//     //send out the updated movie data
//     res.status(200).send(newReview);
//   } catch (error) {
//     res.status(400).send({ message: error._message });
//   }
// });

// //get one movie's review
// router.get("/:id/reviews", async (req, res) => {
//   try {
//     //get movie id
//     const movie_id = req.params.id;
//     //find the movie
//     const movie = await Movie.findById(movie_id);
//     res.status(200).send(movie.reviews);
//   } catch (error) {
//     res.status(400).send({ message: error._message });
//   }
// });

module.exports = router;
