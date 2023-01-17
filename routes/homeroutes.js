const express=require("express");
const app = express.Router()
const {posts, search} = require("../controllers/homecontroller")
const auth = require("../middleware/auth.js")

app.get("/posts", auth,posts)
app.get("/search", auth,search)

module.exports = app