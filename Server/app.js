var express = require("express");
var route = express();
var indexRouter = require("./routes/index");
var EmployeeRouter = require("./routes/Employee");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');
var {db} = require('./db');
var path = require("path")
require('dotenv').config();

db.then(() => console.log("connected successfully"))
var ImageDir = path.join(__dirname, '/photos/');
route.use('/photos', express.static(ImageDir));



route.use(bodyParser.urlencoded({ extended: false }))
route.use(bodyParser.json())
route.use(cors())

route.use("/",indexRouter);
route.use("/",EmployeeRouter);



route.listen(process.env.PORT || 3001); 