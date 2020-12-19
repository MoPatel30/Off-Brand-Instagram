import React, {useState} from 'react'
import {connect} from "react-redux"
import "./Profile.css"
import db from "./firebase";
import {storage} from "./firebase"
import 'firebase/firestore';
import 'firebase/storage';



function Profile({ username, userID, userPhoto, liked, posts, bio }) {
    const [editBio, setEditBio] = useState(false)
    const [desc, setDesc] = useState("This is my bio")

    function changeBio(){
        if(!editBio){
            setEditBio(true)
        }
        else{
            setEditBio(false)
        }
    }

    function updateBio(){
        db.collection("profiles")    
            .doc(userID).update({bio: desc})
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
    }


    return (
        <div className = "profile-body" style = {{backgroundColor: "#f8f9f5"}}>
            <h1 style = {{marginBottom: "20px"}}>{username}'s Profile</h1>

            <div className = "user-picture">
                <img id = "pro-pic" src = {`${userPhoto}`} alt= "pro pic" />
            </div>

       
            <div className = "bio">
                <p>{bio}</p>
                <button onClick = {changeBio}>Edit Bio</button>
                {editBio ? 
                    <div>
                        <input type = "text" onChange = {(e) => {setDesc(e.target.value)}}></input>
                        <button onClick = {updateBio}>Update</button>
                    </div>
              
                    :(
                        null
                    )
                }
            </div>

            <div className = "profile-info">
                <p>{username} has {posts} posts</p>
            </div>

            <div className = "profile-info">
                <p>{username} has liked {liked} posts</p>
            </div>
            

        </div>
    )

}



const mapStateToProps = state => {
    return {
        username: state.username,
        userPhoto: state.userPhoto,
        userID: state.userID,
        liked: state.liked,
        posts: state.posts,
        bio: state.bio
    }
  }
  
  
export default connect(mapStateToProps)(Profile);
  
