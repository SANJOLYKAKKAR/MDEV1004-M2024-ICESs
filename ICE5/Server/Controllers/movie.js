"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateToMovie = exports.AddMovie = exports.DisplayMovieById = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
const util_1 = require("../util");
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Movie List Retrived and Display", data: data });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieById(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrive a movie", data: "" });
    }
    else {
        movie_1.default.findById({ _id: id })
            .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Movie Retrieved and Displayed", data: data });
            }
            else {
                res.status(400).json({ success: false, msg: "Movie not found", data: "" });
            }
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.DisplayMovieById = DisplayMovieById;
function AddMovie(req, res, next) {
    let genres = (req.body.genres) ? (0, util_1.SanitizeArray)(req.body.genres) : (0, util_1.SanitizeArray)("");
    let directors = (req.body.directors) ? (0, util_1.SanitizeArray)(req.body.genres) : (0, util_1.SanitizeArray)("");
    let actors = (req.body.actors) ? (0, util_1.SanitizeArray)(req.body.genres) : (0, util_1.SanitizeArray)("");
    let writers = (req.body.writers) ? (0, util_1.SanitizeArray)(req.body.writers) : (0, util_1.SanitizeArray)("");
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
        res.status(200).json({ success: true, msg: "Movie Added ", data: movie });
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.AddMovie = AddMovie;
function UpdateToMovie(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a movie", data: "" });
    }
    else {
        let genres = (req.body.genres) ? (0, util_1.SanitizeArray)(req.body.genres) : (0, util_1.SanitizeArray)("");
        let directors = (req.body.directors) ? (0, util_1.SanitizeArray)(req.body.genres) : (0, util_1.SanitizeArray)("");
        let actors = (req.body.actors) ? (0, util_1.SanitizeArray)(req.body.genres) : (0, util_1.SanitizeArray)("");
        let writers = (req.body.writers) ? (0, util_1.SanitizeArray)(req.body.writers) : (0, util_1.SanitizeArray)("");
        let movieToUpdate = new movie_1.default({
            _id: id,
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
        movie_1.default.updateOne({ _id: id }, movieToUpdate)
            .then(() => {
            res.status(200).json({ success: true, msg: "Movie Update ", data: movieToUpdate });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.UpdateToMovie = UpdateToMovie;
function DeleteMovie(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a movie", data: "" });
    }
    else {
        movie_1.default.deleteOne({ _id: id })
            .then(() => {
            res.status(200).json({ success: true, msg: "Movie deleted", data: id });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movie.js.map