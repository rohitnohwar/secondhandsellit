require("dotenv").config();
const express=require("express");
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");
const ejs=require("ejs");
const cors=require("cors");
const fs=require("fs");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Fuse=require("fuse.js");
const multer=require("multer");
const path=require("path");
const S3 = require('aws-sdk/clients/s3')
const saltRounds = 10;

const bucketName=process.env.AWS_BUCKET_NAME;
const region=process.env.AWS_BUCKET_REGION;
const accessKeyId=process.env.AWS_ACCESS_KEY;
const secretAccessKey=process.env.AWS_SECRET_KEY

const loginroutes=require("./routes/loginroutes")
const registerroutes=require("./routes/registerroutes")
const profileroutes=require("./routes/profileroutes")
const homeroutes=require("./routes/homeroutes")



const app = express();
app.set('view engine','ejs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./client/Images"));

mongoose.connect(process.env.URI, {useNewUrlParser:true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);


app.use("/", profileroutes)
app.use("/", loginroutes)
app.use("/", homeroutes)
app.use("/", registerroutes)

const port = process.env.PORT || 3001;

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));

    app.get("*", function(req, res){
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => {
});