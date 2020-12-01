// importing
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
let Posts = require("./dbNewPost")



//app config
const app = express()
const port = process.env.PORT || 6000


//middleware
app.use(express.json())
app.use(cors())


//mongoDB connection
const connection_url = ""

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once("open", () => {
    console.log("DB Connected")
})



// api routes
//get tester
app.get("/", (req, res) => res.status(200).send("hello world"))

//post posts
app.post("/posts/", (req, res) => {
    const dbPost = req.body
    Posts.create(dbPost, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })

})

//get posts
app.get("/posts/", (req, res) => {
    Posts.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})



//listener
app.listen(port, () => console.log("Listening on localhost:" + {port}))