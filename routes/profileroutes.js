const express=require("express");
const app = express.Router()
const upload = require("../middleware/multer")
const {entry, userpostsget, deletepost, userpostspost} = require("../controllers/profilecontroller")
const auth = require("../middleware/auth.js")

app.post("/entry",  [upload.single("image"), auth], entry)
app.post("/userposts", auth, userpostspost)
app.get("/userposts", auth, userpostsget)
app.post("/deletepost", auth, deletepost)

module.exports = app