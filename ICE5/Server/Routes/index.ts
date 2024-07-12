import express from 'express';
const router = express.Router();

import { DisplayMovieList, DisplayMovieById, AddMovie, UpdateToMovie, DeleteMovie } from '../Controllers/movie';
import { ProcessLogin, ProcessLogout, ProcessRegistration } from '../Controllers/auth';

/* List of Authentication routes (endpoints) */

/* Register User */
router.post('/register', (req, res, next) => { ProcessRegistration (req, res, next); });

/* Login user */
router.post('/login', (req, res, next) => { ProcessLogin (req, res, next); })

/* Logout User */
router.get('/logout', (req, res, next) => { ProcessLogout (req, res, next); });

/* List of Movie Routes (endpoints)*/

/* GET Movie list. */
router.get('/', (req, res, next) => { DisplayMovieList(req, res, next); });

/* GET Movie by id. */
router.get('/find/:id',  (req, res, next) => { DisplayMovieById(req, res, next); });

/* Add Movie */
router.post('/add', (req, res, next) => { AddMovie(req, res, next); });

/*update movie*/
router.put('/update/:id', (req, res, next) => { UpdateToMovie(req, res, next); });

/* delete movie*/
router. delete('/delete/:id', (req, res, next) => { DeleteMovie(req, res, next); });


export default router;
 