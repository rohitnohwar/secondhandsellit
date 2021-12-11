const express=require("express");
const app = express.Router()
const upload = require("../middleware/multer")
const {entry, userpostsget, deletepost, userpostspost} = require("../controllers/profilecontroller")

app.post("/entry", upload.single("image"), entry)
app.post("/userposts", userpostspost)
app.get("/userposts", userpostsget)
app.post("/deletepost", deletepost)

module.exports = app