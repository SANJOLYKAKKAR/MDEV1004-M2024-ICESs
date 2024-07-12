import express from 'express';
const router = express.Router();

import { DisplayMovieList, DisplayMovieById, AddMovie, UpdateMovie, DeleteMovie } from '../Controllers/movie';

/* List of Routes (endpoints)*/

/* GET Movie list. */
router.get('/', (req, res, next) => { DisplayMovieList(req, res, next); });

/* GET Movie by id. */
router.get('/:id',  (req, res, next) => { DisplayMovieById(req, res, next); });

/* Add Movie */
router.post('/add', (req, res, next) => { AddMovie(req, res, next); });

/*update movie*/
router.put('/update/:id', (req, res, next) => { UpdateMovie(req, res, next); });

/* delete movie*/
router. delete('/delete/:id', (req, res, next) => { DeleteMovie(req, res, next); });

export default router;
 