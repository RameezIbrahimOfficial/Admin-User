const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')

const PORT = process.env.PORT || 3000
const CON_STR = process.env.DB_CON_STR

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set("views", "./views");
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})
app.use('/admin',adminRouter)
app.use('/user',userRouter)

const db = mongoose.connect(CON_STR)

app.listen(PORT,async (req,res)=>{
    await db
    try{
        db.then((con_obj)=>{
            console.log("DB Connected")
        })
        db.catch((err)=>{
            console.log("An Error Occured While connecting to Server")
        })
        console.log("SERVER STARTED")
    }
    catch(err){
        console.log(err)
    }
})