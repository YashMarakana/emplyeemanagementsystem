const express = require("express");
const empRoute = express.Router();
const Emp = require("../model/emp");
const User = require("../model/user");
const mongoose = require("mongoose");
const {Auth} = require("../middlleware/auth")
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
          cb(null,"./photos");
    },
    filename: (req,file,cb ) => {
         cb(null,`${new Date().toDateString()}${file.originalname}`);
    }
})

const upload = multer({
    storage: storage,   
    fileFilter:(req,file,cb) => {

        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
            cb(null,true)
        }else{
            cb(null,false)
        }
    },
    limits:{
        fileSize:1000000,

    }
})
empRoute.get("/emp",(req,res) => {

    res.send("Server ready");
});

empRoute.get("/api/emp/getemp",Auth,(req,res) => {  
    Emp.find({}).populate('author','fname lname').exec((err,item) => {
        if(err)
           res.send(err)
       return res.json({message:"item fetch successfully",data:item})
    })
})

empRoute.post("/api/emp/add",Auth,upload.single('file'),(req,res) => {
    debugger
 console.log("rew.f",req.user);
if(req?.file){

    var items = new Emp({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            file:req.file.filename,
            author:req.user._id 
         })
      }else{
        var items = new Emp({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            author:req.user._id 
         })
      }
        
    items.save()
      .then((result) => {
           
            let id = mongoose.Types.ObjectId(result._id);
           Emp.findById({_id:id}).populate('author','fname lname').exec((err,item) => {
            if(err)
               res.send(err)
           return res.json({message:"item add successfully",data:item})
        })

      })
     })
    
empRoute.put("/api/emp/edit/:id",Auth,upload.single('file'),(req,res) => {
  debugger
    let id = mongoose.Types.ObjectId(req.params.id);

 let Item ={...req.body, author: req.user._id}
 console.log("items",Item);
 
    if(req.file){
        Item = {
         ...Item,
        file: req.file.filename
    }   
}
    Emp.findByIdAndUpdate(id,Item,{new:true}).populate('author', 'fname lname').exec((err,result) => {
        console.log("redsuly",result);
         if(err) return res.send(err);
        
       return res.json({message:"item edit successfully",data:result,error:err});  
    })
})

empRoute.delete("/api/emp/delete/:id",upload.single('file'),(req,res) => {
        
    let id = mongoose.Types.ObjectId(req.params.id);
    console.log("ids",id);
    Emp.findOneAndDelete({_id:id},(err,result) => {
        if(err)
           res.send(err)
         return res.json({message:"item deleted",data:result})  
    })
})
module.exports = empRoute   