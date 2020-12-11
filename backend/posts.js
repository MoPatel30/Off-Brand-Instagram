var express = require('express');
var Post = require('./dbNewPost');
var PostRouter = express.Router();
const multer = require('multer');
const { db } = require('./dbNewPost');
const GridFsStorage = require("multer-gridfs-storage")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});
 

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


PostRouter.route("/images")
    .post((req, res, next) => {
        console.log(req.body);
       
        const newImage = new Posts({
            imageName: req.body.imageName,
            imageData: req.body.path,
            timestamp: req.body.timestamp,
            description: req.body.description
        })

        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));

        db.collection("postcontents").insertOne(newImage, function(err, result) {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(201).send(result)
            }
        })
    });


PostRouter.route("/images")
    .get((req, res) => {
        alert("get went thru")
        console.log("get went thru")
        db.collection("postcontents").find((err, data) => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(201).send(data)
            }
        })
    })

module.exports = PostRouter




const connection_url = "mongodb+srv://moAdmin:Ccl9VJwdnVRO39o5@instagram-cluster.clz69.mongodb.net/Instagram-cluster?retryWrites=true&w=majority"

const connect = mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let gfs



connect.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    })
})

PostRouter.route('/')
        .post(upload.single('file'), (req, res, next) => {
            console.log(req.body);
            // check for existing images
            Post.findOne({ description: req.body.description })
                .then((image) => {
                    console.log(image);
                    if (image) {
                        return res.status(200).json({
                            success: false,
                            message: 'Image already exists',
                        });
                    }

                    let newPost = new Post({
                        name: req.body.name,
                        timestamp: req.body.timestamp,
                        photo:  req.body.photo,
                        description: req.body.description
                    });

                    newPost.save()
                        .then((image) => {

                            res.status(200).json({
                                success: true,
                                image,
                            });
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        })


