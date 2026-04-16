const movies = [];
const crypto = require("crypto");

const listMovies = (req, res) => {
    if (movies.length === 0) {
        return res.json({ message: "No movies found" });
    } else {
        res.json(movies);
    }
}

const getMovieById = (req, res) => {
    const idString = req.params.id;
    const id = parseInt(idString);

    const movie = movies.find(m => m.id === id);

    if (!movie) {
        res.status(404).json({ error: "Movie not found" });
    } else {
        res.json(movie);
    }
}

const createMovie = (req, res) => {
    if (Array.isArray(req.body)) {
        const newMovies = req.body.map(movie => {
            return {
                id: crypto.randomInt(100000, 1000000),
                title: movie.title,
                description: movie.description,
                year: movie.year,
                genres: movie.genres,
                image: movie.image,
                video: movie.video
            };
        });

        movies.push(...newMovies);

        return res.status(201).json(newMovies);
            
    }

    const { title, description, year, genres, image, video } = req.body;

    if (!title || !description || !year || !genres || !image || !video) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const movie = {
        id: crypto.randomInt(100000, 1000000),
        title,
        description,
        year,
        genres,
        image,
        video
    };

    movies.push(movie);

    res.status(201).json(movie);
};

const updateMovie = (req, res) => {
    const idString = req.params.id;
    const id = parseInt(idString);

    const { title, description, year, genres, image, video } = req.body;

    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    const oldMovie = movies[movieIndex];

    const movieUpdated = {
        id: oldMovie.id, // O ID nunca muda
        title: title ?? oldMovie.title,
        description: description ?? oldMovie.description,
        year: year ?? oldMovie.year,
        genres: genres ?? oldMovie.genres,
        image: image ?? oldMovie.image,
        video: video ?? oldMovie.video
    };

    movies[movieIndex] = movieUpdated;

    res.json(movieUpdated);
};

const removeMovie = (req, res) => {
    const idString = req.params.id;
    const id = parseInt(idString);

    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    movies.splice(movieIndex, 1);

    res.json({ message: "Movie deleted successfully" });
}

module.exports = {
    listMovies,
    getMovieById,
    createMovie,
    updateMovie,
    removeMovie
};