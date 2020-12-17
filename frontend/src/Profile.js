import React, {useState} from 'react'
import {connect} from "react-redux"
import "./Profile.css"
import db from "./firebase";
import {storage} from "./firebase"
import 'firebase/firestore';
import 'firebase/storage';



function Profile({ username, userPhoto }) {
    const [bio, setBio] = useState(false)
    const [desc, setDesc] = useState("This is my bio")

    function editBio(){
        if(!bio){
            setBio(true)
        }
        else{
            setBio(false)
        }
    }

    return (
        <div className = "profile-body" style = {{backgroundColor: "#ecf3f9"}}>
            <h1 style = {{marginBottom: "20px"}}>{username}'s Profile</h1>

            <div className = "user-picture">
                <img id = "pro-pic" src = {`${userPhoto}`} alt= "pro pic" />
            </div>

       
            <div className = "bio">
                <p>{desc}</p>
                <button onClick = {editBio}>Edit Bio</button>
                {bio ? 
                    <div>
                        <input type = "text" onChange = {(e) => {setDesc(e.target.value)}}></input>
                        <button onClick = {editBio}>Update</button>
                    </div>
              
                    :(
                        null
                    )
                }
            </div>

            <div className = "profile-info">
                <p>{username} has 0 posts</p>
            </div>

            <div className = "profile-info">
                <p>{username} has liked 0 posts</p>
            </div>
            

        </div>
    )

}



const mapStateToProps = state => {
    return {
        username: state.username,
        userPhoto: state.userPhoto
    }
  }
  
  
export default connect(mapStateToProps)(Profile);
  
