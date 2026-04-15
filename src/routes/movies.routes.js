const { Router } = require("express");

const moviesController = require("../controllers/movies.controller");

const routes = Router();

routes.get("/", (req, res) => {
    console.log(req.method);
    console.log(req.url);
    res.send("Hello, world!");
});

routes.get("/movies", moviesController.listMovies);

routes.get("/movies/:id", moviesController.getMovieById);

routes.post("/movies", moviesController.createMovie);

routes.put("/movies/:id", moviesController.updateMovie);

routes.delete("/movies/:id", moviesController.removeMovie);

module.exports = routes;