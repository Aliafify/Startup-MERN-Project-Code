const mongoose = require("mongoose");

const Account2 = new mongoose.Schema({
    
    name:{type:String},
    email:{type:String,required:true,unique:true},
    username:{type:String },
    password:{type:String ,required:true },
    date:{type:Date, default:Date.now},
    phone:String,
    role:{type:String,default:"user"},
    affilationCode:{type:String , default: null},
    AffilationTree:{type:Array,default:[]}
    }   
)
module.exports= mongoose.model("Account2",Account2)
