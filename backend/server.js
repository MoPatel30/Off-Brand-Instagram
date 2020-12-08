// importing
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
let Posts = require("./dbNewPost")
const bodyParser = require("body-parser")
var router = express.Router()



//app config
const app = express()
const port = process.env.PORT || 3001


//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


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

const postRouter = require("./dbNewPost")
app.use("/posts", postRouter)


// api routes
// get tester
app.get("/", (req, res) => res.status(200).send("hello world"))

app.get("/test", (req, res) => {
    Posts.find((err, data) => {
        if (err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.post("/test", (req, res) => {
    console.log("post test went thru")

    /*const dbPost = {
        name: req.body.name,
        timestamp: req.body.timestamp,
        photo: req.body.photo,
        description: req.body.description
    }*/
    const dbPost = req.body

    db.collection("postcontents").insertOne(dbPost, function(err, result) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(result)
        }
    })

})

//post posts
router.post("/posts", (req, res) => {
    console.log("request received")


    const dbPost = req.body
    dbPost.save()
        .then(() => res.json("user added!"))
        .catch(err => res.status(400).json("Errors: " + err))


    db.collection("postcontents").insertOne(dbPost, function(err, result) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })

})

module.exports = router

/*
.post("https://off-brand-instagram.web.app/posts", (req, res) => {
    console.log("using post method")

    const username = req.body.name
    const date = req.body.timestamp
    const photo = req.body.photo
    const description = req.body.description

    const dbPost = new Posts

    db.collection("postcontents").insertOne(dbPost, function(err, result) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })

    dbPost.save(function(err) {
        if (err)
           throw err;
        else 
           console.log('post saved successfully...');
    });


    Posts.create(dbPost, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })

})
*/


//get posts
app.get("/posts", (req, res) => {
    console.log(res)
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

module.exports = app