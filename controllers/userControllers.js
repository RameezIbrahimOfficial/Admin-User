const userCollection = require('../models/userSchema');

module.exports.getUserRoute = (req, res) => {
    if (req.session.user) {
      res.redirect('/user/userDashboard')
    } else {
      res.render('userLogin')
    }
}

module.exports.postLogin = async (req,res)=>{
  const data = await userCollection.findOne({email:req.body.email})
      if(data){
          if(req.body.email !== data.email){
              res.render('userLogin',{subreddit:"incorrect email"})
          }else if(req.body.password !== data.password){
              res.render('userLogin',{subreddit:"incorrect password"})
          }else{
              if(req.body.email == data.email && req.body.password == data.password){
                  req.session.user = data.email
                  const user = req.session.user
                  res.render('userDashboard',{user})
              }
          }
      }else{
          res.redirect('/')
      }
}

module.exports.getUserDashboard = (req,res)=>{
  if(req.session.user){
    const user = req.session.user
      res.render('userDashboard',{user})
  }
}

module.exports.getUserLogout = (req,res)=>{
  req.session.user=null;
  console.log(req.session)
  res.redirect('/user')
}

module.exports.getUserSignup = (req,res)=>{
  res.render('userSignup')
}

module.exports.postUserSignup = async (req,res)=>{
  await userCollection.create({
      email: req.body.email,
      fname:req.body.fname,
      lname:req.body.lname,
      password:req.body.password
  })
  res.redirect('/')
}
