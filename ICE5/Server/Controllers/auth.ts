import { Request, Response, NextFunction } from "express";
import passport from "passport";
import mongoose from "mongoose";

import User from "../Models/user";

/**
 * Process the registration
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function ProcessRegistration(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new user object
    let newUser = new User({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastname
    });

    User.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose.Error.ValidationError) {
            console.error("All Fields are required");
            return res.status(400).json({ success: false, msg: "Error: user not registered. All fields are required", data: null });
        }

        if (err) {
            console.error("Error: Interesting New User");
            if (err.name == "UserExistsError") {
                console.error("ERROR: User already exists");
            }
            return res.status(400).json({ success: false, msg: "ERROR: User not registered", data: null });
        }

        return passport.authenticate('local')(req, res, () => {
            return res.json({ success: true, msg: "User logged in successfully", data: newUser });
        });
    });
}

/**
 * Process the login request
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function ProcessLogin(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        // Are there any server errors?
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false, msg: "ERROR: Server Error", data: null });
        }
        // Are there any login errors?
        if (!user) {
            console.error("Login Error: User Credentials Error or User Not Found");
            return res.status(400).json({ success: false, msg: "ERROR: Login Error", data: null });
        }

        req.login(user, (err) => {
            // Are there any database errors?
            if (err) {
                console.error(err);
                return res.status(400).json({ success: false, msg: "Error: Database Error", data: null });
            }
            
            return res.json({ success: true, msg: "User Logged in successfully", data: user });
        });
    })(req, res, next);
}

/**
 * Process the logout request
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function ProcessLogout(req: Request, res: Response, next: NextFunction): void {
    req.logOut(() => {
        console.log("User Logged out successfully");
        return res.json({ success: true, msg: "User Logged out successfully", data: null });
    });
}
