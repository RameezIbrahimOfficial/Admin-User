const express = require("express");
const adminRouter = express.Router();
const adminControllers = require("../controllers/adminControllers");

adminRouter.get("/", adminControllers.getAdminRoute);

adminRouter.post("/", adminControllers.postAdminRoute);

adminRouter.post("/searchUser", adminControllers.postSearchUser);

adminRouter.get("/updateUser", adminControllers.getUpdateUser);

adminRouter.post("/updateUser", adminControllers.postUpdateUser);

adminRouter.get("/deleteUser", adminControllers.getDeleteUser);

adminRouter.get("/new-user", adminControllers.getNewUser);

adminRouter.post("/new-user", adminControllers.postNewUser);

adminRouter.get("/logout", adminControllers.getLogout);

adminRouter.get("/adminDashboard", adminControllers.getAdminDashboard);

module.exports = adminRouter;
