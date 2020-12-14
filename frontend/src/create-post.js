import React, {useState, useEffect} from "react"
import "./create-post.css"
import AddBoxIcon from '@material-ui/icons/AddBox';
import PhotoFeed from "./photo-feed"
import firebase from "firebase"
import db from "./firebase";
import {storage} from "./firebase"
import 'firebase/firestore';
import 'firebase/storage';
import TextField from '@material-ui/core/TextField';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



function CreatePost() {
    const [form, setForm] = useState("")
    
    const makePost = (e) => {
        e.preventDefault()
        setForm(<MakePostForm />)
    }

    return (
        <div>
            <AddBoxIcon fontSize = "large" onClick = {makePost} />
            
            <div>
                <p>{form}</p>
            </div>

        </div>
    )
}

export default CreatePost





export function MakePostForm(){
    const date = String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear())) 
    
    const [pic, setPic] = useState(null)
    const [desc, setDesc] = useState("")
    const [name, setName] = useState("Mo Patel")

    const [progress, setProgress] = useState(0)
    const [post, setPost] = useState("")



    const ImageChange = (e) => {
        e.preventDefault()
        if(e.target.files[0]){
            setPic(e.target.files[0])
        }
    }


    const ImageUpload = (e) => {
        e.preventDefault()
        
        const uploadTask = storage.ref(`posts/${pic.name}`).put(pic)
        var number = Math.floor(Math.random() * 100000000)
       
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress1 = Math.round((snapshot.byteTransferred / snapshot.totalBytes) * 100)
                console.log(progress1)
                setProgress(progress1)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref("posts")
                    .child(pic.name)
                    .getDownloadURL()
                    .then(url => {
                        var post = {
                            name: String(name),
                            timestamp: date,
                            photo: url,
                            description: String(desc),
                            likes: 0,
                            id: String(number),
                            likedBy: []
                        }
     
                        db.collection("posts").doc(String(number)).set(post)
                            .then(function() {
                                console.log("Document successfully written!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });

                        setProgress(0)
                        setDesc("")
                        setPic(null)

                    })
            }

        )
            
    }


    return(
        <div className = "post-form">
            <form type = "submit">
                <h2 id = "username">Mo Patel</h2>
                <p id = "timestamp">{date}</p>
                <div className = "input-forms">
                    <label className = "label-forms">Upload Photo: </label>
                    <input id = "picture" type="file" onChange = {ImageChange}/>
                    <Button
                        variant="contained"
                        color="default"
                        type = "file"
                        startIcon={<CloudUploadIcon />}
                    >Upload Image</Button>

                    <TextField
                        className = "post-description"
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        onChange = {(e) => {setDesc(e.target.value)}}
                    />
              
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    type = "submit"
                    onClick = {ImageUpload}
                > Post </Button>
            
             
            </form>


        </div>
                 
    )
   
}

/*
            <img id = "display-image" alt = "pic" src= "" style = {{width: "400px", height: "400px"}} />
           
            <p>{post}</p>

*/



export function NewPost(props){
    const [likes, setLikes] = useState(props.likes)
    const [likedByTheseUsers, setLikedByTheseUsers] = useState(props.likedBy)
    

    function likePost(postId){ 
        if(likedByTheseUsers.indexOf(props.name) === -1){    
            setLikes(likes + 1)            
            db.collection("posts").doc(`${postId}`).update({likes: likes})
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            
            var tempLikedByTheseUsers = likedByTheseUsers
            tempLikedByTheseUsers.push(props.name)
            setLikedByTheseUsers(tempLikedByTheseUsers)

            db.collection("posts").doc(`${postId}`).update({likedBy: likedByTheseUsers})
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }      
    }


    return( 
        <div>
            <div className = "post-body">
                <div className = "post-header">
                    <h2>{props.user}</h2>
                    <h2>{props.timestamp}</h2>
                </div>

                <div className = "post-img">
                    <img id = "display-image" alt = "pic" src= {props.photo} style = {{width: "400px", height: "400px"}} />
                    
                </div>

                <div className = "post-description">
                    <p><b> Description: </b> {props.description} </p>
                </div>
                
                <div className = "post-description">
                    <p><b> Likes: </b> {props.likes} </p>
                </div>

                <div className = "post-description">
                    <FavoriteIcon onClick = {() => {likePost(props.id)}} cursor = "pointer" />
                    <button onClick = {() => {likePost(props.id)}} cursor = "pointer">
                        Like Post
                    </button>
                </div>
            </div>
        </div>
    
    )  
}
