import React, {useState, useEffect} from 'react'
import "./Login.css";
import {auth, provider} from "./firebase"
import {connect} from "react-redux"
import store from "./store/index"
import db from "./firebase"



function Login() {

    const [userInfo, setUserInfo] = useState(null)

    function signIn(){
        auth
            .signInWithPopup(provider)
            .then((result) => {
              
                console.log(result.user)
                setUserInfo(result.user)      
            }) 
            .catch((error) => alert(error.message))
          
    }

    useEffect(() => {

        console.log(userInfo)
        
        if(userInfo !== null){
            var isOldprofile = checkForProfile(userInfo.displayName)
        if(!isOldprofile){
            var profileNames = []
            console.log("true")
            db.collection("profiles").onSnapshot(function(doc) {
                doc.forEach((info) => {         
                    profileNames.push(info)   
                })
          
                for(let i = 0; i < profileNames.length; i++){
                    var curUserInfo = profileNames[i]
    
                    if(curUserInfo.data().username === userInfo.displayName){
                        store.dispatch({
    
                        type: "ADD_POST",
                            payload:
                            {   
                                username: curUserInfo.data().username,
                                userphoto: userInfo.photoURL,
                                userID: curUserInfo.id,
                                likes: curUserInfo.data().likes,
                                posts: curUserInfo.data().posts,
                                bio: curUserInfo.data().bio
                                          
                            }
                        })
                          console.log(curUserInfo.data().username)
                          console.log(userInfo.photoURL)
                          console.log(curUserInfo.id)
                          console.log(curUserInfo.data().likes)
                          console.log(curUserInfo.data().posts)
                          console.log(curUserInfo.data().bio)
                    }
                }
    
            })
                
        }
        else{
            console.log("making new new profile, false")
            var userId = createProfile(userInfo.displayName)
            updateState(userInfo.displayName, userInfo.photoURL, userId)         
        }  
        }
        
    }, [userInfo])



    function checkForProfile(username){
        
        let profileNames = []
        let isNewProfile = true

        db.collection("profiles").get().then((doc) => {
            doc.forEach((info) => {       
                profileNames.push(info.data().username)
            })
            for(let i = 0; i < profileNames.length; i++){
                var name = profileNames[i]
                console.log(isNewProfile)
                if(name === username){
                    isNewProfile = false
                }
            }
            console.log("hi" + String(isNewProfile))
            return isNewProfile

        })

    }


    function createProfile(username){

        const post = {
            username: username,
            bio: "Edit your bio",
            likes: 0,
            posts: 0
        }      
        
        var doesProfileNotExist = checkForProfile(username)
        
        var number = Math.floor(Math.random() * 999999999)

        if(doesProfileNotExist === true){
            console.log("making new new profile")
            
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
                likes: 0,
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


