const express = require("express");
const route2 = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { Auth } = require("../middlleware/auth")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


route2.get("/", (req, res) => {
    res.send("Server ready for doing");
});

route2.get("/api/getuser/:id", (req, res) => {

let id = mongoose.Types.ObjectId(req.params.id);

    User.findById({_id:id}, (err, item) => {
        if (err)
            res.send(err);
        res.json({ message: "items fetch ", data:item});
    })
})

route2.put("/api/userupdate/:id",(req,res) => {
    debugger
    let id = mongoose.Types.ObjectId(req.params.id)

    User.findByIdAndUpdate({_id:id},{...req.body},{new:true},(err,item) => {

        if(err)
          res.send(err)
        return res.json({message:"user update successfully",data:item})  
    })

})


route2.post("/api/register", async (req, res) => {

    await User.findOne({ email: req.body.email })
        .then((item) => {
            if (item) {
                res.send("item already exist")
            } else {

                    const users = new User({ ...req.body })
                      let token = jwt.sign({
                            email: users.email,
                            _id: users._id
                        }, process.env.JWT_KEY, { expiresIn: "24h" })
                        users.token = token
                        users.save()
                            .then((err, item) => {
                                   console.log("itemsadsa",item);
                                if (err)
                                    return res.send(err)

                                return res.json({ message: "User Register Successfully", data:item });
                            })
                 
            }   

        })
})

route2.post("/api/login", (req, res) => {
   debugger
    User.findOne({ email: req.body.email }).then(async(item) => {
        console.log("$#$xc", item);
   
        if (!item) return res.send("user not exists");
        const user = await User.findOne({email:req.body.email})
        var valid =  await user.matchPassword(req.body.password)
        console.log("valid", valid);
        debugger
        if (!valid) {
            res.send("user auth failed")
        } else {
            console.log("item", item);
            const token = jwt.sign({
                email: item.email,
                _id: item._id

            }, process.env.JWT_KEY, { expiresIn: '24h' });
         
            User.findByIdAndUpdate({ _id: item._id }, { $set: token }, { new: true }, (err, result) => {
                console.log("resultdata",result);
                if (err)
                    res.send(err);

                return res.json({ message: "User Login Successfully", token: result.token,data:result })
            })
        }

    })

})

route2.post("/api/change-password", Auth, async (req, res) => {
    let id = req.user._id
    // console.log("req.user", req.user);
    const { oldPassword, newPassword, confPassword } = req.body
    const user = await User.findById(id)
     console.log("usert", user);
    const Valid = await user.matchPassword(oldPassword)
    console.log("isvalid", Valid);
    if (!Valid) {
        return res.send({ message: "old password doesn't match." })
    }
    if (oldPassword === newPassword) {
        return res.send({ message: "old password and new password can not be same" })
    }
    if (newPassword === confPassword) {

        user.password = newPassword
        await user.save()
        return res.json({ message: "Password Change Successfully"})
    } else {
        return res.send({ message: "invalid password." })
    }
})

module.exports = route2;