const jwt = require("jsonwebtoken");
const User = require('../model/user')

const Auth = (req,res,next) => {
  const authHeader = req.headers.authorization
  if(authHeader){

      const token = authHeader.split(" ")[1]
       
      jwt.verify(token,process.env.JWT_KEY,(err,user) => {
          if(err){
            console.log("error",err);
         
           return next("Invalid token")
          }else{
         //   console.log("user",user);
            User.findById(user._id).exec((err, res) => {
          //    console.log("response",res);
              if(err){
                console.log("Error", err);
              }else{
                req.user = res;
                next()
              }
            })            
          }
      })
  }else{
      return res.status(401).send("Token cannot get")
  }
}
// export { Auth }
exports.Auth = Auth