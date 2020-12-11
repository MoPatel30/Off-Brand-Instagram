import React, {useState, useEffect} from "react"
import "./create-post.css"
import AddBoxIcon from '@material-ui/icons/AddBox';
import PhotoFeed from "./photo-feed"
import axios from "axios";
import firebase from "firebase"
import db from "./firebase";
import {storage} from "./firebase"
import 'firebase/firestore';
import 'firebase/storage';


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
    const [time, setTime] = useState("")

    const [progress, setProgress] = useState(0)
    const [post, setPost] = useState("")
    const [hello, setHello] = useState("")
    const [url, setUrl] = useState("")



    function getPictureURL(post){

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/` +
                             `off-brand-instagram.appspot.com/o/${post}?alt=media`;
        return imageUrl;
    }

    const ImageChange = (e) => {
        e.preventDefault()
        if(e.target.files[0]){
            setPic(e.target.files[0])
        }
    }
    const ImageUpload = (e) => {
        e.preventDefault()

        /*console.log(pic.name)
        const url = getPictureURL(pic.name)
        var number = Math.floor(Math.random() * 100000000)
       
        db.collection("posts").doc(String(number)).set({
            description: desc,
            name: "Mo Patel",
            photo: url,
            timestamp: time
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });*/

        
        const uploadTask = storage.ref(`posts/${pic.name}`).put(pic)
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.byteTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                    .ref("posts")
                    .child(pic.name)
                    .getDownloadURL()
                    .then(url => {
                        var post = {
                            name: String(name),
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            photo: url,
                            description: String(desc)
                        }
                        setPost(post)
                        console.log(post)

                        var number = Math.floor(Math.random() * 100000000)
       
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
                    <label className = "label-forms">Description: </label>
                    <input id = "description" type="text" onChange = {(e) => {setDesc(e.target.value)}}/>
                </div>
                <progress value = {progress} max = "100" />
                <button type = "submit" onClick = {ImageUpload}> Post </button>

            </form>

            <img id = "display-image" alt = "pic" src= "" style = {{width: "400px", height: "400px"}} />
           
            <p>{post}</p>
            <p>{hello}</p>

        </div>
                 
    )
   
}




export function NewPost(props){

    const date = String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear()))

    return( 
        <div>
            <div className = "post-body">
                <div className = "post-header">
                    <h2>{props.user}</h2>
                    <h2>{date}</h2>
                </div>

                <div className = "post-img">
                    <img id = "display-image" alt = "pic" src= {props.photo} style = {{width: "400px", height: "400px"}} />
                    
                </div>

                <div className = "post-description">
                    <p><b> Description: </b> {props.description} </p>
                </div>
            </div>
        </div>
    
    )  
}
