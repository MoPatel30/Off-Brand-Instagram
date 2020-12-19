import React, {useState, useEffect} from "react"
import "./create-post.css"
import db from "./firebase";
import {storage} from "./firebase"
import 'firebase/firestore';
import 'firebase/storage';
import TextField from '@material-ui/core/TextField';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';




export function CreatePost(props) {
    const [form, setForm] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const makePost = (e) => {
        e.preventDefault()
        if(!submitted){
            setForm(<MakePostForm user = {props.user} />)
            setSubmitted(true)
        }
        else{
            setForm(null)
            setSubmitted(false)
        }

    }

    return (
        <div className = "upload-btn">
            <Button
                variant="contained"
                color="default"
                onClick = {makePost}
                startIcon={<CloudUploadIcon />}
            >Upload Image</Button>

            <div>
                <p>{form}</p>
            </div>

        </div>
    )
}





function MakePostForm({userID, posts, username}){
    const date = String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear())) 
    const [pic, setPic] = useState(null)
    const [desc, setDesc] = useState("")
    const [name, setName] = useState(username)
    const [progress, setProgress] = useState(0)
    console.log(userID)
 
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
        updateUserPostCount(userID)
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

        document.getElementById("form").style.visibility = "hidden";
            
    }


    function updateUserPostCount(userID){
        console.log(userID)
        db.collection("profiles").doc(userID).update({posts: posts + 1})
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }


    function closeForm(){
        document.getElementById("form").style.visibility = "hidden";
    }


    return(
        <div id = "form" className = "post-form">
            <form className = "form-items">
                <h2 id = "username">{username}</h2>
                <p id = "timestamp">{date}</p>
                <div className = "input-forms">
                    <label className = "label-forms">Upload Photo: </label>                   
                    <input style = {{marginBottom: "25px"}} id = "picture" type="file" onChange = {ImageChange}/>
                   
                    <TextField
                        style = {{marginBottom: "15px"}}
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
                    color="secondary"
                    onClick = {closeForm}
                > Close </Button>

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


const mapStateToProps = state => {
    return {
        username: state.username,
        userID: state.userID,
        posts: state.posts
    }
}
  
  
export default connect(mapStateToProps)(MakePostForm);

  





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
                    <h2 className = "post-text" style = {{paddingLeft: "5px"}}>{props.name}</h2>
                    <h2 className = "post-text" style = {{paddingRight: "5px"}}>{props.timestamp}</h2>
                </div>

                <div className = "post-img">
                    <img id = "display-image" alt = "pic" src= {props.photo} />
                    
                </div>

                <div className = "post-description">
                    <p id = "description-text"><b>Description: </b> {props.description} </p>
                </div>
                
                <div className = "post-likes">                   
                    <p id = "likes-text"><b> Likes: </b> {props.likes} </p> 
                    <FavoriteIcon  onClick = {() => {likePost(props.id)}} cursor = "pointer" />
                  
                </div>
            </div>
        </div>
    
    )  
}

