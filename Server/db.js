var mongoose = require("mongoose");

var url = "mongodb://127.0.0.1:27017/company";

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});

var db = mongoose.connection;

exports.db = db
