const express = require('express');
const Router = express.Router();

const Admin = require("../modules/adminSchema.js");
const Account2 = require("../modules/userSchema.js");
// const Account3 = require("./account3Schema.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");



// Register a user
Router.post("/register/user", createUser);
function createUser(req, res) {
  try {
    console.log('try')
    Account2.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (err) {
        res.send(err);
        console.log(err);
      }
      if (doc) res.status(200).send("This email has an account");

      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new Account2({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(200);
        res.send("created");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
}  
//---------Login------------------
Router.get("/auth", async (req, res) => {
    try {
      // console.log('auth try')
      if (req.user) {
        const id = req.session.passport.user;
        // const role = req.user.user.role;
        await Account2.findOne({ _id: id }, (err, user) => {
          if (err) throw err;
          res.status(200).send({ user: user, auth: true });
        });
    } else {
        // console.log(session.passport.user)
        res.status(209).send({ user: null, auth: false });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e)
    }
  });
  //-----
  Router.post("/login", auth);
  function auth(req, res, next) {
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        console.log(req.body)
        if (!user) res.status(209).send({ user: null, auth: false });
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.status(200).send({ user, auth: true });
          });
        }
      })(req, res, next);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  Router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
// updat
  Router.put("/update", update);
async function update(req, res) {
  try {
    const property = req.body.property; // {}OBJECT OF PROPERTIES TO UPDATE
    const id= property._id;
     Account2.findOne({_id:id},async (err,user)=>{
       if(err){
        res.status(202).send({message:'error while excuting user data from database',case:false})
       }
       if(!user){
         res.status(209).send({message:'could not find this user in our database',case:false})
      }
      if(user){
        Object.keys(property).forEach((p)=>user[p]=property[p])
        await user.save((e)=>{
         if(!e){
           res.status(200).send({message:'User updated',case:true})
         }
         else{res.status(202).send({message:'error while saving user update',case:false})}
        })
      }
     })

  } catch (err) {
    console.error(err);
    res.status(500).send(err)
  }

}
// password verification API
Router.post('/pass/verify',passVerify);
function passVerify(req,res){
  try{

    const {id,password}= req.body;
       console.log('data')
      Account2.findOne({_id:id},(err,user)=>{
        if(err){console.log(err.message);
       return res.status(200).send({message:'Database error',case:'error'});
        }
        if(user){
           const userPass = user.password;
           bcrypt.compare(password,userPass,(err,result)=>{
            
            console.log(result)
            if(err){
              return res.status(200).send({message:'server error',case:false});
            }
            if(result){
             return res.status(200).send({message:'password matched', case:true})
            }
            if(!result){
              return res.status(200).send({message:'password does not matched', case:false})
             }
           })
        }
      })
     
    }catch(e){res.status(500).send(e.message)}
}

module.exports = Router;