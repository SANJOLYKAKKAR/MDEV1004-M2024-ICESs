"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateMovie = exports.AddMovie = exports.DisplayMovieById = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
const util_1 = require("../util");
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Movie List Retrieved and Displayed", data: data });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to retrieve movie list", data: err });
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieById(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a movie", data: "" });
        return;
    }
    movie_1.default.findById(id)
        .then((data) => {
        if (data) {
            res.status(200).json({ success: true, msg: "One Movie Retrieved and Displayed", data: data });
        }
        else {
            res.status(404).json({ success: false, msg: "Movie not found", data: "" });
        }
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to retrieve movie", data: err });
    });
}
exports.DisplayMovieById = DisplayMovieById;
function AddMovie(req, res, next) {
    let genres = req.body.genres ? (0, util_1.SanitizeArray)(req.body.genres) : [];
    let directors = req.body.directors ? (0, util_1.SanitizeArray)(req.body.directors) : [];
    let actors = req.body.actors ? (0, util_1.SanitizeArray)(req.body.actors) : [];
    let writers = req.body.writers ? (0, util_1.SanitizeArray)(req.body.writers) : [];
    let movie = new movie_1.default({
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        genres: genres,
        directors: directors,
        writers: writers,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating
    });
    movie_1.default.create(movie)
        .then(() => {
        res.status(201).json({ success: true, msg: "Movie Added", data: movie });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to add movie", data: err });
    });
}
exports.AddMovie = AddMovie;
function UpdateMovie(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a movie", data: "" });
        return;
    }
    let genres = req.body.genres ? (0, util_1.SanitizeArray)(req.body.genres) : [];
    let directors = req.body.directors ? (0, util_1.SanitizeArray)(req.body.directors) : [];
    let actors = req.body.actors ? (0, util_1.SanitizeArray)(req.body.actors) : [];
    let writers = req.body.writers ? (0, util_1.SanitizeArray)(req.body.writers) : [];
    let movieToUpdate = {
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        genres: genres,
        directors: directors,
        writers: writers,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating
    };
    movie_1.default.updateOne({ _id: id }, movieToUpdate)
        .then(() => {
        res.status(200).json({ success: true, msg: "Movie Updated", data: movieToUpdate });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to update movie", data: err });
    });
}
exports.UpdateMovie = UpdateMovie;
function DeleteMovie(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a movie", data: "" });
        return;
    }
    movie_1.default.deleteOne({ _id: id })
        .then(() => {
        res.status(200).json({ success: true, msg: "Movie deleted", data: id });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to delete movie", data: err });
    });
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movie.js.map