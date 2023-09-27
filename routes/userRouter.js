const express = require("express");
const userRouter = express.Router();
const userControllers = require("../controllers/userControllers");

userRouter.get("/", userControllers.getUserRoute);

userRouter.post("/login", userControllers.postLogin);

userRouter.get("/userDashboard", userControllers.getUserDashboard);

userRouter.get("/logout", userControllers.getUserLogout);

userRouter.route("/signup")
  .get(userControllers.getUserSignup)
  .post(userControllers.postUserSignup);

module.exports = userRouter;
