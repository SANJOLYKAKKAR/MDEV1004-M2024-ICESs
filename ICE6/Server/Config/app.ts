import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Response, Request }  from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// modules for authentication
import passport from 'passport';
import session from 'express-session';
import passportLocal, { Strategy } from 'passport-local';

// prevent memory leaks with memorystore

import createMemoryStore from 'memorystore';

const MemoryStore = createMemoryStore (session);

//modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT Aliases
let JWTStrategy = passportJWT.Strategy; //alias
let ExtractJWT = passportJWT.ExtractJwt;//alias

//define authentication strategy
//let strategy = passportLocal.Strategy; //alias

// import the user model
import User from '../Models/user';

//import mongoose and related modules
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);

//DB Connection Events
mongoose.connection.on('connected', () => {
  console.log('connected to MongoDB Atlas');
})


import indexRouter from '../Routes/index';
import movieRouter from '../Routes/movie';



import { dot } from 'node:test/reporters';

//create an express application
const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add cors to config
app.use(cors());

// setup express session
app.use(session({
  cookie: { maxAge: 86400000}, // 1 day in milliseconds
  store: new MemoryStore({checkPeriod: 86400000}),// 1 dy in millisecond
  secret:db.secret,
  saveUninitialized: false,
  resave: false
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// implemet an authentication strategy
passport.use(User.createStrategy());

// serialize and deserialize the user info
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());

//setup JWT options
let jwtOptions = 
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: db.secret
};

// setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done)=>
{
  try
  {
    const user = User.findById(jwt_payload.id);
    if(user)
    {
      return done(null, user);
    }
    return done(null, false);
    
  } catch (error)
  {
    return done(error, null);
  }
});

//deploy the strategy
passport.use(strategy);

app.use('/api', indexRouter);
/* Example: Secure the movie routes with JWT athentication */
//app.use('/api/movie', passport.authenticate ('jwt', {session: false}), movieRouter);
app.use('/api/movie', movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err: HttpError, req:Request , res:Response, next:NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error - please use /api as a route prefix for yourAPI reqyests');
});

export default app;
