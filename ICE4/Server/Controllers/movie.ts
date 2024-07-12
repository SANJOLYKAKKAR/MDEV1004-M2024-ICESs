import { Request, Response, NextFunction } from "express";
import Movie from "../Models/movie";
import { SanitizeArray } from "../util";

/**
 * This function displays the movie list in JSON format.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieList(req: Request, res: Response, next: NextFunction): void {
    Movie.find({})
        .then((data) => {
            res.status(200).json({ success: true, msg: "Movie List Retrieved and Displayed", data: data });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to retrieve movie list", data: err });
        });
}

/**
 * This function displays a single movie by ID in JSON format.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieById(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    // Ensure that the id is valid
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a movie", data: "" });
        return;
    }

    Movie.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Movie Retrieved and Displayed", data: data });
            } else {
                res.status(404).json({ success: false, msg: "Movie not found", data: "" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to retrieve movie", data: err });
        });
}

/**
 * This function adds a new movie.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddMovie(req: Request, res: Response, next: NextFunction): void {
    let genres = req.body.genres ? SanitizeArray(req.body.genres as string) : [];
    let directors = req.body.directors ? SanitizeArray(req.body.directors as string) : [];
    let actors = req.body.actors ? SanitizeArray(req.body.actors as string) : [];
    let writers = req.body.writers ? SanitizeArray(req.body.writers as string) : [];

    let movie = new Movie({
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

    Movie.create(movie)
        .then(() => {
            res.status(201).json({ success: true, msg: "Movie Added", data: movie });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to add movie", data: err });
        });
}

/**
 * This function updates an existing movie.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateMovie(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    // Ensure that the id is valid
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a movie", data: "" });
        return;
    }

    let genres = req.body.genres ? SanitizeArray(req.body.genres as string) : [];
    let directors = req.body.directors ? SanitizeArray(req.body.directors as string) : [];
    let actors = req.body.actors ? SanitizeArray(req.body.actors as string) : [];
    let writers = req.body.writers ? SanitizeArray(req.body.writers as string) : [];

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

    Movie.updateOne({ _id: id }, movieToUpdate)
        .then(() => {
            res.status(200).json({ success: true, msg: "Movie Updated", data: movieToUpdate });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to update movie", data: err });
        });
}

/**
 * This function deletes a movie.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteMovie(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    // Ensure that the id is valid
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a movie", data: "" });
        return;
    }

    Movie.deleteOne({ _id: id })
        .then(() => {
            res.status(200).json({ success: true, msg: "Movie deleted", data: id });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to delete movie", data: err });
        });
}
