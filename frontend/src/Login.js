import React, {useState} from 'react'
import "./Login.css";
import {auth, provider} from "./firebase"
import App from "./App"
import {connect} from "react-redux"
import store from "./store/index"
import db from "./firebase"
import firebase from "firebase"


function Login() {
    const [userID, setUserID] = useState("")


    function signIn(){
        auth
        .signInWithPopup(provider)
        .then((result) =>{
          console.log(result)
          console.log(result.user.displayName)
        
          createProfile(result.user.displayName)    
          updateState(result.user.displayName, result.user.photoURL, userID)            
        })     
    }


    function createProfile(username){
        
        let newProfile = true;
        
        const post = {
            username: username,
            bio: "",
            liked: 0,
            posts: 0
        }

        db.collection("profiles").get().then((doc) => {
            doc.forEach((info) => {
                console.log(info.id)
                console.log(info.data().username)
           
                if(info.data().username === username){
                    newProfile = false
                }        
            })
        })

        var number = Math.floor(Math.random() * 100000000)

        if(newProfile){
            db.collection("profiles").doc(String(number)).set(post)
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
        setUserID(String(number))

    }


    function updateState(name, photoURL, userID){
        console.log(name)
        store.dispatch({
            type: "ADD_POST",
            payload:
            {   
                username: name,
                userphoto: photoURL,
                userID: userID           
            }
          })
    }


    return (
        <div id = "login-pos">
            <div className = "login-screen">
                <h1 id = "welcome"><i>Welcome to PhotoShare</i></h1>
                <h2 id = "title"> Sign In </h2>
                <button id = "google-btn" onClick = {signIn}>Google</button>
            </div>
            
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(mapDispatchToProps)(Login)
