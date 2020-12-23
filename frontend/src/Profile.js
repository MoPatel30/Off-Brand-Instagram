import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import "./Profile.css"
import db from "./firebase";
import 'firebase/firestore';
import 'firebase/storage';



function Profile({ username, userID, userPhoto, likes, posts, bio }) {
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
            <h1 id = "profile-header" style = {{marginBottom: "20px"}}>{username}'s Profile</h1>

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
                <p>{username} has liked {likes} posts</p>
            </div>
            

        </div>
    )

}



const mapStateToProps = state => {
    return {
        username: state.username,
        userPhoto: state.userPhoto,
        userID: state.userID,
        likes: state.likes,
        posts: state.posts,
        bio: state.bio
    }
  }
  
  
export default connect(mapStateToProps)(Profile);
  




export function ViewProfiles(props){
    const [user, setUser] = useState(props.username)
    const [photo, setPhoto] = useState("")
    const [bio, setBio] = useState("")
    const [likes, setLikes] = useState(0)
    const [posts, setPosts] = useState(0)
    console.log(props.username)
    const [displayProfile, setDisplayProfile] = useState(true)
 

    useEffect(() => {
        var profileNames = []

        db.collection("profiles").onSnapshot(function(doc) {
            doc.forEach((info) => {       
                profileNames.push(info)
            })

            for(let i = 0; i < profileNames.length; i++){
                var userInfo = profileNames[i]
                
                if(userInfo.data().username === user){
                    setBio(userInfo.data().bio)
                    setLikes(userInfo.data().likes)
                    setPosts(userInfo.data().posts) 
                }
            }

        })

    }, [user])

    function toggleProfile(){     
        setDisplayProfile(!displayProfile)
    }

    return(
        <div>
        {displayProfile ? 
        <div className = "profile-body" style = {{backgroundColor: "#f8f9f5"}}>

            <h1 style = {{marginBottom: "20px"}}>{user}'s Profile</h1>

            <div className = "user-picture">
                <img id = "pro-pic" src = {photo} alt= "pro pic" />
            </div>

            <div className = "bio">
                <p>{bio}</p>
        
            </div>

            <div className = "profile-info">
                <p>{user} has {posts} posts</p>
            </div>

            <div className = "profile-info">
                <p>{user} has liked {likes} posts</p>
            </div>

            <button onClick = {toggleProfile}>close</button>

        </div>
        :(
            <div>
                <p></p>
            </div>
        )
        }
        </div>
        
    
    )
}

