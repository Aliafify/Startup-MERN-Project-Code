const express = require('express');

const Router = express.Router();

const Account2 = require('../modules/userSchema.js');

console.log('skjnd')
Router.post('/get-team',getTeam)

async function getTeam(req,res){
    try{
        console.log('team')
    const teamIDS = req.body.team;
    const users = await Account2.find({_id:{$in:teamIDS}});
    // const updatedUsers= users.map(u=>{
    //     const {password,...uu}= u;
    //      console.log(uu)
    //     return uu
    //     });
    // console.log(updatedUsers)
    res.status(200).send({case:true,message:'users successfully sent',users:users});
    }catch(e){
        res.send(e.message);
    }
}




module.exports = Router;