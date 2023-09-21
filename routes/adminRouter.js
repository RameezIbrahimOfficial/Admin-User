const express = require('express')
const adminRouter = express.Router();
const adminCollection = require('../models/adminSchema')
const userCollection = require('../models/userSchema')
// const cookieParser = require('cookie-parser')
// const nocache = require('nocache')

// adminRouter.use(cookieParser());
// adminRouter.use(nocache());

adminRouter.get('/',async (req,res)=>{
    if(req.session.admin){
        users = await userCollection.find({})
        res.render('adminDashboard',{users})
    }else{
        res.render('adminLogin')
    }
})

adminRouter.post('/',async (req,res)=>{
    const data = await adminCollection.findOne({email:req.body.email})
    const users = await userCollection.find({})
    if(data){
        if(req.body.email !== data.email && req.body.password === data.password){
            res.redirect('/admin')
        }else if(req.body.email === data.email && req.body.password !== data.password){
            res.redirect('/admin')
        }else{
            if(req.body.email === data.email && req.body.password === data.password){
                req.session.admin = req.body.email;
                res.render('adminDashboard',{users})
            }
        }
    }else{
        res.redirect('/')
    }
})

adminRouter.post('/searchUser',async (req,res)=>{
    const name = req.body.search;
    const regex = new RegExp(`^${name}`, "i")
    const users = await userCollection.find({email:{$regex:regex}}).exec();
    res.render('adminDashboard',{users})
})

adminRouter.get('/updateUser',async (req,res)=>{
    const id = req.query.id;
    const data = await userCollection.find({_id:id})
    user = data[0]
    res.render('updateUser',{user})
})

adminRouter.post('/updateUser',async (req,res)=>{
    const id = req.query.id;
    const data = await userCollection.updateOne({_id:id},{
        $set:{
            email:req.body.email,
            fname:req.body.fname,
            lname:req.body.lname,
            password:req.body.password
        }
    })
    const users = await userCollection.find({});
    res.render("adminDashboard", { users });
})

adminRouter.get('/deleteUser',async (req,res)=>{
    const id = req.query.id;
    const data = await userCollection.deleteOne({_id:id})
    const users = await userCollection.find({});
    res.render('adminDashboard',{users})
    
})

adminRouter.get('/new-user',(req,res)=>{
    res.render('userSignup')
})

adminRouter.post('/new-user',(req,res)=>{
   res.render('adminDashboard')
})

adminRouter.get('/logout',(req,res)=>{
    req.session.admin = null;
    res.redirect("/");
})

adminRouter.get('/adminDashboard',(req,res)=>{
    if(req.session.admin){
        res.render('adminDashboard')
    }
})

module.exports = adminRouter