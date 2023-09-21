const express = require('express')
const adminRouter = express.Router();
const adminCollection = require('../models/adminSchema')
const userCollection = require('../models/userSchema')

adminRouter.get('/',(req,res)=>{
    res.render("adminLogin")
})
adminRouter.post('/',async (req,res)=>{
    const data = await adminCollection.findOne({email:req.body.email})
    const users = await userCollection.find({})
    if(data){
        if(req.body.email != data.email){
            res.redirect('/')
        }else if(req.body.password != data.password){
            res.redirect('/')
        }else{
            if(req.body.email === data.email && req.body.password === data.password){
                res.render('adminDashboard',{users})
            }
        }
    }else{
        res.redirect('/')
    }
})

adminRouter.get('/logout',(req,res)=>{
    res.send("Logout Success")
})

adminRouter.get('/updateUser',(req,res)=>{
    res.render('updateUser',{details:"Update Details",btn:"Update"})
})

adminRouter.post('/updateUser',(req,res)=>{
    res.send("Updated Success")
})

adminRouter.get('/deleteUser',(req,res)=>{
    res.send("Deleted Success")
})

adminRouter.get('/new-user',(req,res)=>{
    res.render('updateUser',{details:"New User",btn:"Create"})
})

module.exports = adminRouter