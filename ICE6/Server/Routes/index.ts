import express from 'express';
const router = express.Router();

import { ProcessLogin, ProcessLogout, ProcessRegistration } from '../Controllers/auth';

/* List of Authentication routes (endpoints) */

/* Register User */
router.post('/register', (req, res, next) => { ProcessRegistration (req, res, next); });

/* Login user */
router.post('/login', (req, res, next) => { ProcessLogin (req, res, next); })

/* Logout User */
router.get('/logout', (req, res, next) => { ProcessLogout (req, res, next); });




export default router;
 