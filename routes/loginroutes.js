const express=require("express");
const app = express.Router()
const {login, confirmlogin} = require("../controllers/logincontroller")
const auth = require("../middleware/auth.js")

app.get("/login", login)
app.get("/confirmlogin", auth, confirmlogin)

module.exports = app