const mongoose = require("mongoose")


const newpostSchema = mongoose.Schema({
    name: String,
    timestamp: String,
    photo:  String,
    description: String
})


const post_content = mongoose.model("postContent", newpostSchema)
module.exports = post_content