const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const userCollection = require('../models/userSchema')

userRouter.post('/login',async (req,res)=>{
    const data = await userCollection.findOne({email:req.body.email})
    if(data){
        if(req.body.email !== data.email){
            res.render('home',{subreddit:"incorrect email"})
        }else if(req.body.password !== data.password){
            res.render('home',{subreddit:"incorrect password"})
        }else{
            if(req.body.email == data.email && req.body.password == data.password){
                res.render('userDashboard')
            }
        }
    }else{
        res.redirect('/')
    }
})

userRouter.get('/logout',(req,res)=>{
    res.send("LOGOUT SUCCESS")
})

userRouter.get('/signup',(req,res)=>{
    res.render('userSignup')
})

userRouter.post('/signup',async (req,res)=>{
    res.end("SIGNUP SUCCESS")
    await userCollection.create({
        email: req.body.email,
        fname:req.body.fname,
        lname:req.body.lname,
        password:req.body.password
    })
})

module.exports = userRouter