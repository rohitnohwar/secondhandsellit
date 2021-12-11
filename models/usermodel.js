const mongoose=require("mongoose");
const {postSchema}=require("./postmodel")

const userSchema=new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    name: {type:String, required:true},
    password: {type:String, required:true},
    posts:[postSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User