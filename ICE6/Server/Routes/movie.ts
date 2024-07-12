import express from 'express';
const router = express.Router();
import passport from 'passport';

import { DisplayMovieList, DisplayMovieById, AddMovie, UpdateToMovie, DeleteMovie } from '../Controllers/movie';

/* List of Movie Routes (endpoints)*/

/* GET Movie List - fallback in case /list is not used */
router.get('/', (req, res, next) => { DisplayMovieList(req, res, next); });

/* GET Movie list. */
router.get('/list', (req, res, next) => { DisplayMovieList(req, res, next); });

/* GET Movie by id. */
router.get('/find/:id',  (req, res, next) => { DisplayMovieById(req, res, next); });

/* Add Movie */
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => { AddMovie(req, res, next); });

/*update movie*/
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => { UpdateToMovie(req, res, next); });

/* delete movie*/
router. delete('/delete/:id', passport.authenticate('jwt', {session: false}),(req, res, next) => { DeleteMovie(req, res, next); });


export default router;
 