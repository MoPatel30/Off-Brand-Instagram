import React, {useState} from 'react'
import "./Login.css";
import {auth, provider} from "./firebase"
import {connect} from "react-redux"
import store from "./store/index"
import db from "./firebase"



function Login() {

    //const [userID, setUserID] = useState("")


    function signIn(){
        auth
        .signInWithPopup(provider)
        .then((result) =>{

          if(!checkForProfile(result.user.displayName)){
            var profileNames = []

            db.collection("profiles").get().then((doc) => {
                doc.forEach((info) => {       
                    profileNames.push(info)
                })
    
                for(let i = 0; i < profileNames.length; i++){
                    var userInfo = profileNames[i]
                    if(userInfo.data().username === result.user.displayName){
                        store.dispatch({
                            type: "ADD_POST",
                            payload:
                            {   
                                username: userInfo.data().username,
                                userphoto: result.user.photoURL,
                                userID: userInfo.id,
                                liked: userInfo.data().liked,
                                posts: userInfo.data().posts,
                                bio: userInfo.data().bio
                                      
                            }
                          })
                          console.log(userInfo.data().username)
                          console.log(result.user.photoURL)
                          console.log(userInfo.id)
                          console.log(userInfo.data().liked)
                          console.log(userInfo.data().posts)
                          console.log(userInfo.data().bio)
                    }
                }

            })
            
 
          }
          else{
              var userId = createProfile(result.user.displayName)
              updateState(result.user.displayName, result.user.photoURL, userId)         
          }
    
        })     
    }


    function checkForProfile(username){
        
        let profileNames = []
        let isNewProfile = true

        db.collection("profiles").get().then((doc) => {
            doc.forEach((info) => {       
                profileNames.push(info.data().username)
            })

            for(let i = 0; i < profileNames.length; i++){
                var name = profileNames[i]
                if(name === username){
                    isNewProfile = false
                }
            }
            return isNewProfile
        })


    }


    function createProfile(username){

        const post = {
            username: username,
            bio: "Edit your bio",
            liked: 3,
            posts: 3
        }      
   
        var doesProfileNotExist = checkForProfile(username)
        
        var number = Math.floor(Math.random() * 999999999)

        if(doesProfileNotExist){
          
            db.collection("profiles").doc(String(number)).set(post)
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }

        //setUserID(String(number))
        return String(number)

    }


    function updateState(name, photoURL, userId){
       
        store.dispatch({
            type: "ADD_POST",
            payload:
            {   
                username: name,
                userphoto: photoURL,
                userID: userId,
                liked: 0,
                posts: 0,
                bio: "Edit your own personal bio!"
                      
            }
          })
    }


    return (
        <div id = "login-pos">
            <div className = "login-screen">
                <h1 id = "welcome"><i>Welcome to PhotoShare</i></h1>
                <p id = "slogan"><i>Share your moments with the world</i></p>
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


