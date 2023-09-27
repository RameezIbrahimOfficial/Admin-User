const express = require("express");
const userRouter = express.Router();
const userControllers = require("../controllers/userControllers");

userRouter.get("/", userControllers.getUserRoute);

userRouter.post("/login", userControllers.postLogin);

userRouter.get("/userDashboard", userControllers.getUserDashboard);

userRouter.get("/logout", userControllers.getUserLogout);

userRouter.get("/signup", userControllers.getUserSignup);

userRouter.post("/signup", userControllers.postUserSignup);

module.exports = userRouter;
