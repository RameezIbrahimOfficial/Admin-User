const express = require('express');
const  session = require('express-session')
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require("uuid");
const userRouter = express.Router();
const userCollection = require('../models/userSchema');
const nocache = require('nocache');

userRouter.use(nocache())
userRouter.use(cookieParser())

// userRouter.use(
//     session({
//       secret: uuidv4(),
//       resave: false,
//       saveUninitialise: false,
//     })
//   );

userRouter.get("/", (req, res) => {
    if (req.session.user) {
      res.redirect('/user/userDashboard')
    } else {
      res.render('userLogin')
    }
  });


userRouter.post('/login',async (req,res)=>{
    const data = await userCollection.findOne({email:req.body.email})
        if(data){
            if(req.body.email !== data.email){
                res.render('userLogin',{subreddit:"incorrect email"})
            }else if(req.body.password !== data.password){
                res.render('userLogin',{subreddit:"incorrect password"})
            }else{
                if(req.body.email == data.email && req.body.password == data.password){
                    req.session.user = data.email
                    res.render('userDashboard')
                }
            }
        }else{
            res.redirect('/')
        }
})

userRouter.get('/userDashboard',(req,res)=>{
    if(req.session.user){
        res.render('userDashboard')
    }
})



userRouter.get('/logout',(req,res)=>{
    req.session.user=null;
    console.log(req.session)
    res.redirect('/user')
})

userRouter.get('/signup',(req,res)=>{
    res.render('userSignup')
})

userRouter.post('/signup',async (req,res)=>{
    await userCollection.create({
        email: req.body.email,
        fname:req.body.fname,
        lname:req.body.lname,
        password:req.body.password
    })
    res.redirect('/')
})

module.exports = userRouter