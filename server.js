const express = require("express");
const mongoose = require("mongoose");
const nocache = require("nocache");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const app = express();

const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

const PORT = process.env.PORT || 3000;
const CON_STR = process.env.DB_CON_STR;
const LOCAL_STR = process.env.LOCAL_STR;

app.use(nocache());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialise: false,
  })
);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const db = mongoose.connect(LOCAL_STR);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/user/userDashboard");
  } else if (req.session.admin) {
    res.redirect("/admin/adminDashboard");
  } else {
    res.render("main");
  }
});

app.listen(PORT, async (req, res) => {
  await db;
  try {
    db.then((con_obj) => {
      console.log("DB Connected");
    });
    db.catch((err) => {
      console.log("An Error Occured While connecting to Server");
    });
    console.log("SERVER STARTED");
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
