"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
const util_1 = require("../util");
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastname
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            console.error("All Fields are required");
            return res.status(400).json({ success: false, msg: "Error: user not registered. All fields are required", data: null, token: null });
        }
        if (err) {
            console.error("Error: Interesting New User");
            if (err.name == "UserExistsError") {
                console.error("ERROR: User already exists");
            }
            return res.status(400).json({ success: false, msg: "ERROR: User not registered", data: null, token: null });
        }
        return res.json({ success: true, msg: "User Registered successfully", data: newUser, token: null });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false, msg: "ERROR: Server Error", data: null, token: null });
        }
        if (!user) {
            console.error("Login Error: User Credentials Error or User Not Found");
            return res.status(400).json({ success: false, msg: "ERROR: Login Error", data: null, token: null });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ success: false, msg: "Error: Database Error", data: null, token: null });
            }
            const authToken = (0, util_1.GenerateToken)(user);
            return res.json({ success: true, msg: "User Logged in successfully", data: user, token: authToken });
        });
        return;
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function ProcessLogout(req, res, next) {
    req.logOut(() => {
        console.log("User Logged out successfully");
        return res.json({ success: true, msg: "User Logged out successfully", data: null, token: null });
    });
}
exports.ProcessLogout = ProcessLogout;
//# sourceMappingURL=auth.js.map