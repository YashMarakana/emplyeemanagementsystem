const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type:String,
        required:true
    },
    token:{
       type:String
   }
})

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user",userSchema);
module.exports = User