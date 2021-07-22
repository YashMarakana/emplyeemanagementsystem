const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const empSchema = new mongoose.Schema({

    fname: String,
    lname: String,
    email:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:false
    },    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'user'         
    }
},
{timestamps:true})

const Emp = mongoose.model("employee",empSchema);
module.exports = Emp;