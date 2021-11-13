require("dotenv").config();
const express=require("express");
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

const s3=new S3({
    region,
    accessKeyId,
    secretAccessKey
});

function uploadFile(file){
    const fileStream=fs.createReadStream(file.path);

    const uploadParams={
        Bucket:bucketName,
        Body:fileStream,
        Key:file.filename
    }

    return s3.upload(uploadParams).promise();
}

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"client/Images");
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

const app = express();
app.set('view engine','ejs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./client/Images"));

mongoose.connect(process.env.URI, {useNewUrlParser:true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const postSchema=new mongoose.Schema({
    item: {type:String, required:true},
    name: {type:String, required:true},
    number: {type:Number, required:true},
    email: {type:String, required:true},
    address: {type:String, required:true},
    locality: {type:String, required:true},
    city: {type:String, required:true},
    time: {type:Date, required:true},
    image:{type:String, required:true}
});

const Post = mongoose.model("Post", postSchema);

const userSchema=new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    name: {type:String, required:true},
    password: {type:String, required:true},
    posts:[postSchema]
});

const User = mongoose.model("User", userSchema);

app.post("/register", function(req, res){
    User.exists({username:req.body.username}, function (err, doc) {
        if (err){
            console.log(err)
        }else{
            if(!doc){
                bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                    if(err){
                        console.log(err);
                    }
                    else {
                        const newUser= new User({
                            username:req.body.username,
                            email:req.body.username,
                            name:req.body.name,
                            password:hash
                        });
                        newUser.save();
                        res.json({message:"User account created"});
                    }
                })
            }
            else{
                res.json({message:"User account already exists"});
            }
        }
    });
});

app.post("/login", function(req, res){
    const username= req.body.username;
    const password= req.body.password;

    User.findOne({username:username}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else if(!foundUser){
            res.json({auth:false, message:"User doesn't exists"});
        }
        
        else  if(foundUser){
            bcrypt.compare(password, foundUser.password, function(err, response){
                if(response === true){
                    res.json({auth: true, foundUser:foundUser, name:foundUser.name, email:foundUser.email, message:"user exists"});
                }
                else if(response===false){
                    res.json({ auth:false, message:"Incorrect credentials"});
                }
            });
        }
    });
});

app.post("/entry",  upload.single("image"), async (req, res)=>{
    const date=new Date();
    const result=await uploadFile(req.file);
    const entry=new Post({
        item:req.body.item,
        name: req.body.name,
        number:req.body.number,
        email: req.body.email,
        address:req.body.address,
        locality:req.body.locality,
        city:req.body.city,
        time:date,
        image:req.file.filename
    });

    const pathToFile = "./client/Images/"+req.file.filename;

    fs.unlink(pathToFile, function(err) {
        if (err) {
            throw err
        } 
    })

    User.findOne({username: req.body.email}, function(err, foundUser){
        foundUser.posts.push(entry);
        foundUser.save();
        res.send("");
    });
});

app.get("/userposts", function(req, res){
    User.findOne({username:req.query["username"]}, function(err, foundUser){
        foundUser=foundUser.posts;
        foundUser.sort(function(a,b){
            return new Date(b.time) - new Date(a.time);
        });
        res.json({foundPosts:foundUser});
    });
});

app.post("/userposts", function(req, res){
    User.findOne({username:req.body.username},function(err, foundUser){
        foundUser=foundUser.posts;
        foundUser.sort(function(a,b){
            return new Date(b.time) - new Date(a.time);
        });
        res.json({foundPosts:foundUser});
    });
});

app.get("/posts", function(req, res){
    User.find({}, function(err, foundUsers){
        foundUsers=foundUsers.map(o=>o.posts).flat();
        foundUsers.sort(function(a,b){
            return new Date(b.time) - new Date(a.time);
        });
        res.json({foundPosts:foundUsers});
    });
});

app.post("/search", function(req, res){
    User.find({}, function(err, foundUsers){
        foundUsers=foundUsers.map(o=>o.posts).flat();
        const fuse = new Fuse(foundUsers, {
            keys: ["item", "locality", "city"]
        });

        foundUsers = fuse.search(req.body.search)
        foundUsers = foundUsers.map(o => o.item);

        res.json({foundPosts:foundUsers});
    });
});

app.post("/deletepost", function(req, res){

    const params={
        Bucket: bucketName,
        Key:req.body.image
    }

    s3.deleteObject(params, function(err,data){
        if(err){
            throw err;
        }
    })

    User.findOneAndUpdate({username:req.body.username}, {$pull:{posts:{_id:req.body._id}}}, function(err, foundList){
        if(err){
            console.log(err);
        }

        User.findOne({username:req.body.username}, function(err, foundUser){
            foundUser=foundUser.posts;
            foundUser.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            res.json({foundPosts:foundUser});
        });
    });
});

const port = process.env.PORT || 3001;

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));

    app.get("*", function(req, res){
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => {
});