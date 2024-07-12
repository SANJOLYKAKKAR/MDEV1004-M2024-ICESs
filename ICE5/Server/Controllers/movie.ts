// Movie Controller logic goes here
import { Request, Response, NextFunction } from "express";

import Movie from "../Models/movie";
import { SanitizeArray } from "../util";


/**
 *This function displays the movie list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieList(req: Request, res: Response, next: NextFunction): void
{
    Movie.find({})
    .then((data)=>
    {
        res.status(200).json({success: true, msg: "Movie List Retrived and Display", data: data})

    })
    .catch((err)=>
    {
        console.error(err);
    })
}


/**
 *This function displays a single movie by ID in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieById(req: Request, res: Response, next: NextFunction): void
{
    // endpoint should be /api/:id
    let id = req.params.id;

    //ensure that the id is valid
    if (id.length != 24)
        {
            res.status(400).json({success: false, msg:"A valid ID is required to retrive a movie", data: ""});
        }
        else
        {
            Movie.findById({_id: id})
            .then((data) =>
            {   
                if(data)
                    {
                        res.status(200).json ({success: true, msg: "One Movie Retrieved and Displayed", data: data})

                    }
                    else
                    {
                        res.status(400).json({success: false, msg:"Movie not found", data: ""});

                    }
            })
            .catch((err) =>
            {
            console.error(err);
            })
        } 
        }

        

        /**
         *
         *
         * @export
         * @param {Request} req
         * @param {Response} res
         * @param {NextFunction} next
         */
        export function AddMovie(req: Request, res:Response, next: NextFunction): void
        {
            let genres = (req.body.genres) ? SanitizeArray(req.body.genres as string) : SanitizeArray("");
            let directors = (req.body.directors) ? SanitizeArray(req.body.genres as string) : SanitizeArray("");
            let actors = (req.body.actors) ? SanitizeArray(req.body.genres as string) : SanitizeArray("");
            let writers = (req.body.writers) ? SanitizeArray(req.body.writers as string) : SanitizeArray("");

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
            .then(() =>
            {
                res.status(200).json({success: true, msg: "Movie Added ", data: movie});
            })
            .catch((err) =>
            {
                console.error(err);
            })

    }

    
/**
 *
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateToMovie (req: Request, res:Response, next: NextFunction): void
    {
         // endpoint should be /api/update/:id
    let id = req.params.id;

    //ensure that the id is valid
    if (id.length != 24)
        {
            res.status(400).json({success: false, msg:"A valid ID is required to update a movie", data: ""});
        }
        else
        {
            let genres = (req.body.genres) ? SanitizeArray(req.body.genres as string) : SanitizeArray("");
            let directors = (req.body.directors) ? SanitizeArray(req.body.genres as string) : SanitizeArray("");
            let actors = (req.body.actors) ? SanitizeArray(req.body.genres as string) : SanitizeArray("");
            let writers = (req.body.writers) ? SanitizeArray(req.body.writers as string) : SanitizeArray("");

            let movieToUpdate = new Movie({
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

        Movie.updateOne({_id: id},movieToUpdate)
            .then(() =>
            {
                res.status(200).json({success: true, msg: "Movie Update ", data: movieToUpdate});
            })
            .catch((err) =>
            {
                console.error(err);
            })

        }
    }

    
/**
 *
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteMovie (req: Request, res:Response, next: NextFunction): void
    {
        // end point should be /api/delete/ :id
        let id = req.params.id;

        //ensur that the id is valid
        if (id.length != 24)
            {
                res.status(400).json({success: false, msg:"A valid ID is required to delete a movie", data: ""});
            }
            else


{
        Movie.deleteOne({_id: id})
        .then(() =>
            {
                res.status(200).json({success: true, msg: "Movie deleted", data: id});
            })
            .catch((err) =>
                {
                    console.error(err);
                })
    }
    }