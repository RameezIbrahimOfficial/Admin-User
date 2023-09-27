const express = require("express");
const adminRouter = express.Router();
const adminControllers = require("../controllers/adminControllers");

adminRouter.route("/")
  .get(adminControllers.getAdminRoute)
  .post(adminControllers.postAdminRoute);

adminRouter.route("/updateUser")
  .get(adminControllers.getUpdateUser)
  .post(adminControllers.postUpdateUser);

adminRouter.route("/new-user")
  .get(adminControllers.getNewUser)
  .post(adminControllers.postNewUser);

adminRouter.post("/searchUser", adminControllers.postSearchUser);

adminRouter.get("/deleteUser", adminControllers.getDeleteUser);

adminRouter.get("/logout", adminControllers.getLogout);

adminRouter.get("/adminDashboard", adminControllers.getAdminDashboard);

module.exports = adminRouter;
