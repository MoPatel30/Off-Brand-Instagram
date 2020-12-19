// importing
const express = require("express")
const mongoose = require("mongoose")

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const logger = require('morgan');
const methodOverride = require('method-override');

const cors = require("cors")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")

let Posts = require("./dbNewPost")
var router = express.Router()
var PostRouter = require("./dbNewPost")


//app config
const app = express()
const port = process.env.PORT || 3001

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
    return next();
});

//middleware

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger("dev"))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))
app.use(express.static(path.join(__dirname, "public")))



//mongoDB connection
const connection_url = 
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once("open", () => {
    console.log("DB Connected")
})


const storage = new GridFsStorage({
    url: connection_url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => { 
                if(err){
                    return reject(err)
                }
                const fileName = buf.toString("hex") + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                }
                resolve(fileInfo)
            })
        })
    }
})

const upload = multer({ storage })


app.use("/", PostRouter(upload))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
   
});  

//listener
app.listen(port, () => console.log("Listening on localhost:" + {port}))

module.exports = app